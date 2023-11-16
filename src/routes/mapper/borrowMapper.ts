import dbconn from "../../utils/dbconn";
import { IResult } from "../../types/entity";

export class borrowMapper{
  // 插入借阅记录
  insertOne(user_id: number, book_id: number, callback:any){
    dbconn.query("insert into borrow_history values(null, now(), ?, ?)", [user_id, book_id], (err, re) =>{
      if (err) {
        callback(IResult.getErrorResult(err));
      } 
      else {
        // 回调函数传值
        callback(IResult.getSuccessResult());
      }
    })
  }
}