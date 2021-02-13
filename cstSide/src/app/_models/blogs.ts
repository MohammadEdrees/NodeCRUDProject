export class Blogs {
    constructor(public _id:any,public title:string,
      public body:string,
      public createTime:Date,
      public userId:number,public likes:number
      ,public hidden:boolean,public img:string,
      public comments:string
      ){}
}
