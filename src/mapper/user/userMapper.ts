import dbconn from "../../utils/dbconn";
import { IBorrowHistory, IResult, IUser } from "../../types/entity";
import { MysqlError } from "mysql";

class userMapper{
  // 插入用户
  insertOne(name: string, callback: any){
    dbconn.query("insert into users values(null, ?)", name, (err: MysqlError | null, re:any) => {
      if (err) 
        callback(IResult.getErrorResult(err));
      else {
        // 回调函数传值
        callback(IResult.getSuccessResult());
      }
    })
  }

  // 查询所有用户
  selectAll(callback: any){
    dbconn.query('select * from users', (err: MysqlError | null, re: IUser[]) => {
      if (re.length == 0)     // 结果集是一个数组，可以此判断
        callback(IResult.getFailResult("用户未找到"));
      else
        // 回调函数传值
        callback(IResult.getSuccessResult(re));
    })
  }

  // 通过id查询指定用户
  selectOneById(id: number, callback: any){
    dbconn.query("select * from users where id = ?", id, (err: MysqlError | null, re: IUser[]) =>{
      // 回调函数传值
      if (re.length == 0)     // 结果集是一个数组，可以此判断
        callback(IResult.getFailResult("用户未找到"));
      else
        callback(IResult.getSuccessResult(re[0]));   //数据库设计不会有id重复，所以取首项即可
    })
  }

  // 通过username查询指定用户
  selectOneByName(name: string, callback: any){
    dbconn.query("select * from users where username = ?", name, (err: MysqlError | null, re: IUser[]) =>{
      // 回调函数传值
      if (re.length == 0)     // 结果集是一个数组，可以此判断
        callback(IResult.getFailResult("用户未找到"));
      else{
        callback(IResult.getSuccessResult(re[0]));   //数据库设计不会有id重复，所以取首项即可
      }
    })
  }

}

export default new userMapper();