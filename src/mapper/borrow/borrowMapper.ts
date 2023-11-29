import dbconn from "../../utils/dbconn";
import { IBorrowHistory, IResult } from "../../types/entity";
import { MysqlError } from "mysql";

export class borrowMapper{
  
  // 插入借阅记录
  insertOne(user_id: number, book_id: number, callback:any){
    dbconn.query("insert into borrow_history values(null, now(), ?, ?)", [user_id, book_id], (err, re) =>{
      if (err) 
        callback(IResult.getErrorResult(err));
      else
        // 回调函数传值
        callback(IResult.getSuccessResult());
    })
  }

  // 通过图书id查询所有用户记录
  selectBorrowedUsersByBookId(id: number, callback: any){
    dbconn.query("select * from borrow_history where book_id = ?", id, (err: any, re: any) =>{
      if (re.length == 0)
        callback(IResult.getFailResult("无记录"));
      else
        callback(IResult.getSuccessResult(re));
    });
  }

  // 通过用户id查询所有图书记录
  selectBorrowedBooksByUserId(id: number, callback: any){
    dbconn.query("select * from borrow_history where user_id = ?", id, (err: any, re: any) =>{
      if (re.length == 0)
        callback(IResult.getFailResult("无记录"));
      else
        callback(IResult.getSuccessResult(re));
    })
  }
}

export default new borrowMapper();