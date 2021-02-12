export class Blogs {
    constructor(public title:string,
      public body:string,
      public createTime:Date,
      public userId:number,public likes:number
      ,public hidden:boolean,public image:string,
      public comments:string
      ){}
}
