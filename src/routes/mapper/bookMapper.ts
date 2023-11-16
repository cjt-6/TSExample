import dbconn from "../../utils/dbconn";
import { IBorrowHistory, IResult } from "../../types/entity";

export class bookMapper{
  // 插入图书
  insertOne(name: string, callback: any){
    dbconn.query("insert into books values(null, ?)", name, (err, re) => {
      if (err) {
        callback(IResult.getErrorResult(err));
      } 
      else {
        // 回调函数传值
        callback(IResult.getSuccessResult());
      }
    })
  }

  // 查询所有图书
  selectAll(callback: any){
    dbconn.query('select * from books', (err, re) => {
    if (err) {
      callback(IResult.getErrorResult(err));
    } 
    else {
      // 回调函数传值
      callback(IResult.getSuccessResult(re));
    }
  })
  }

  // 通过id查询指定图书
  selectOneById(id: number, callback: any){
    dbconn.query("select * from books where id = ?", id, (err, re) =>{
      if (err) {
        callback(IResult.getErrorResult(err));
      } 
      else {
        // 回调函数传值
        if (re.length == 0)     // 结果集是一个数组，可以此判断
          callback(IResult.getErrorResult("图书未找到"));
        else{
          callback(IResult.getSuccessResult(re[0]));   //数据库设计不会有id重复，所以取首项即可
        }
      }
    })
  }

  // 通过bookname查询指定图书
  selectOneByName(name: string, callback: any){
    dbconn.query("select * from books where bookname = ?", name, (err, re) =>{
      if (err) {
        callback(IResult.getErrorResult(err));
      } 
      else {
        // 回调函数传值
        if (re.length == 0)     // 结果集是一个数组，可以此判断
          callback(IResult.getErrorResult("图书未找到"));
        else{
          callback(IResult.getSuccessResult(re[0]));   //数据库设计不会有id重复，所以取首项即可
        }
      }
    })
  }

  // 通过图书id查询所有用户记录
  selectBorrowedUsersByBookId(id: number, callback: any){
    dbconn.query("select * from borrow_history where book_id = ?", id, (err, re: IBorrowHistory[]) =>{
      if (err) {
        callback(IResult.getErrorResult(err));
      } 
      else{
        if (re.length == 0 )
        callback(IResult.getErrorResult("无记录"));
      else
        callback(IResult.getSuccessResult(re));
      }
    })
  }

}