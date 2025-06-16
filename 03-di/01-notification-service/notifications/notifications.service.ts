import { Injectable,BadRequestException } from "@nestjs/common";

@Injectable()
export class NotificationsService {

sendEmail(to: string, subject: string, message: string): void{
    if (to.length>0){
        console.log(`${message}`)
    }else{
        throw new BadRequestException('email is empty');
    }

    }
    

    sendSMS(to: string, message: string): void{
      

        if (to.length>0){
            console.log(`${message}`)
        }else{
            throw new BadRequestException('number is empty');
        }




    }

}
