import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { MatchingService } from "./matching.service";
import { User } from "../decorators/user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('matching')
export class MatchingController {
  constructor(private matchingService :  MatchingService) {
  }

  @Post('all')
  choice(@Body() list : any){
    const prefer = list['listPerson']
    console.log(list);
    return this.matchingService.choice(prefer) ;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  choice2(@Body() body :any, @User() user){
    const prefer = body['preferenceList']
    return this.matchingService.add(prefer,user,body['room'])
  }
}

