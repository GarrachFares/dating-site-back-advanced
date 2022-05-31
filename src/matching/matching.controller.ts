import { Body, Controller, Post } from "@nestjs/common";
import { MatchingService } from "./matching.service";

@Controller('matching')
export class MatchingController {
  constructor(private matchingService :  MatchingService) {
  }

  @Post()
  choice(@Body() list : any[]){
    const prefer = list['listPerson']
    return this.matchingService.choice(prefer) ;
  }
}

