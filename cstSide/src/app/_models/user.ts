import { Time } from "@angular/common";

export class User {
    /**
     *
     */
    constructor(public mail:string,
      public username:string,
      public password:string,
      public firstname:string,
      public lastname:string,
      public dop:Date,
      public logindate:Date,
      public posts:string[],
      public following:string[],
      public followers:string[],
      public token:string,
      public expiresIn:any,
       public _id:string) {


    }
}
