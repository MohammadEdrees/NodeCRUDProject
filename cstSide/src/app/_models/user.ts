import { Time } from "@angular/common";

export class User {
    /**
     *
     */
    constructor(public dop:Date,public token:string,public expiresIn:Time) {
        
        
    }
}
