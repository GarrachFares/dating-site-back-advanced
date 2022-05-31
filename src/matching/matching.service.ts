import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
import { JoinedRoomEntity } from "../chat/entity/joined.room.entity";
import { MatchingEntity } from "../chat/entity/matching.entity";
import { UserI } from "../chat/interfaces/user.interface";
import { RoomI } from "../chat/interfaces/room.interface";
import { UserService } from "../user/user.service";
import { RoomService } from "../chat/service/room-service/room/room.service";

@Injectable()
export class MatchingService {

  constructor(
    @InjectRepository(MatchingEntity)
    private matchingRepository: Repository<MatchingEntity>,
    private userService : UserService,
    private roomService : RoomService) {
  }

  /*choice will receive an array of objects of the form :
    {
    "pseudoName" : "flen",
    "sexe" : "M" or "W",
    "roomId" : ""
    "preferenceList" : ["foulena1",foulena2","foulena3","foulena4"]
    }
  * */
  choice(prefer : Object[]) {
    const N = prefer.length / 2
    //console.log(prefer);
    const map = new Map();
    const mapInv = new Map();
    const prefMatrix = [];
    var menIdx = 0 ;
    var womenIdx = 0 ;
    for (var i=0;i<2*N;i++) {
      var person : Object = prefer[i];
      console.log("person n ",i," ",person);
      if( person['sexe'] === "M"){
        map.set(person['pseudoName'],menIdx);
        mapInv.set(menIdx,person['pseudoName']);
        prefMatrix[menIdx] = person['preferenceList'] ;
        menIdx++;
      }else{
        map.set(person['pseudoName'],womenIdx+N);
        mapInv.set(womenIdx+N,person['pseudoName']);
        prefMatrix[womenIdx+N] = person['preferenceList'] ;
        womenIdx++ ;
      }
    }
    console.log(map);

    const matrix =[]
    for (let i = 0; i < 2*N; i++) {
      matrix[i] = [0,0]
    }
    console.log(matrix);
    for (let i = 0; i < 2*N; i++) {
      for (let j = 0; j < N; j++) {
       matrix[i][j] = map.get(prefMatrix[i][j]) ;
      }
    }
    return stableMarriage(matrix,mapInv)
  };

  async add(prefer: any, user: UserI, roomID: number) {
    let match : MatchingEntity
    match = await this.matchingRepository.findOne({ where: { user: user.id, room: roomID } })
    if (!match) {
      match = new MatchingEntity() ;
    }
    match.preferenceList = prefer;
    match.user = await this.userService.findUserByUsername(user.username)
    match.room = await this.roomService.getRoomEntityById(roomID)
    await this.matchingRepository.save(match)
  }
}


// This function returns true if woman 'w' prefers man 'm1' over man 'm'
function wPrefersM1OverM( prefer,  w,  m,  m1)
{
  var N = prefer.length / 2;
  // Check if w prefers m over her current engagement m1
  for (var i = 0; i < N; i++)
  {

    // If m1 comes before m in list of w, then w prefers her
    // current engagement, don't do anything
    console.log(w);
    if (prefer[w][i] == m1)
      return true;

    // If m comes before m1 in w's list, then free her current
    // engagement and engage her with m
    if (prefer[w][i] == m)
      return false;
  }
}
// Prints stable matching for N boys and N girls. Boys are numbered as 0 to
// N-1. Girls are numbered as N to 2N-1.
function stableMarriage( prefer,map)
{
  var N = prefer.length /2
  // Stores partner of women. This is our output array that
  // stores passing information.  The value of wPartner[i]
  // indicates the partner assigned to woman N+i.  Note that
  // the woman numbers between N and 2*N-1. The value -1
  // indicates that (N+i)'th woman is free
  var wPartner = new Array(N);

  // An array to store availability of men.  If mFree[i] is
  // false, then man 'i' is free, otherwise engaged.
  let mFree = new Array(N);

  // Initialize all men and women as free
  wPartner.fill(-1);
  mFree.fill(false);
  var freeCount = N;

  // While there are free men
  while (freeCount > 0)
  {
    // Pick the first free man (we could pick any)
    var m;
    for (m = 0; m < N; m++)
      if (mFree[m] == false)
        break;

    // One by one go to all women according to m's preferences.
    // Here m is the picked free man
    for (var i = 0; i < N && mFree[m] == false; i++)
    {
      var w = prefer[m][i];

      // The woman of preference is free, w and m become
      // partners (Note that the partnership maybe changed
      // later). So we can say they are engaged not married
      if (wPartner[w-N] == -1)
      {
        wPartner[w-N] = m;
        mFree[m] = true;
        freeCount--;
      }

      else  // If w is not free
      {

        // Find current engagement of w
        var m1 = wPartner[w-N];

        // If w prefers m over her current engagement m1,
        // then break the engagement between w and m1 and
        // engage m with w.
        if (wPrefersM1OverM(prefer, w, m, m1) == false)
        {
          wPartner[w-N] = m;
          mFree[m] = true;
          mFree[m1] = false;
        }
      } // End of Else
    } // End of the for loop that goes to all women in m's list
  } // End of main while loop


  // Print the solution
  console.log("Woman      Man");
  for (var i = 0; i < N; i++)
    console.log(" " + map.get(i+N) + "       " + map.get(wPartner[i]));
  const payload = new Array()
  for (var i = 0; i < N; i++)
    payload.push([map.get(i+N),map.get(wPartner[i])]);
  return payload ;
}
