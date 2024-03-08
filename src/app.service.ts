import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Delete method and add the service method for the checkserverhealth to be used in the controller 
  getHello(): string {
    return 'Hello World!';
  }
}
