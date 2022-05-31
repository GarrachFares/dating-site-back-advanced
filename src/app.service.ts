import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getViewName() {
    return 'index';
  }

}
