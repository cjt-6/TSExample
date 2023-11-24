import { describe, expect, jest, test} from '@jest/globals';
import borrowMapper from './borrowMapper';
import { IResult, IBorrowHistory } from '../../types/entity';
import dbconn from "../../utils/dbconn"

// mock方法测试
let testName: string = "borrowMapper";

describe(testName + " test", () =>{
    let history: IBorrowHistory[] = [{id: 1, userId: 1, bookId: 1, time: new Date("2011-11-11")}];

    // 模拟query
    function changeParamQuery(status: string, re?: IBorrowHistory[]){
        (dbconn.query as any) = jest.fn((query: string, values: any, callback: any) => {
            if(status == IResult.ERROR)
                callback(status, null);
            else
                if(re)
                    callback(null, re);
                else
                    callback(null, []);
        });
    }

    // 查找图书借阅记录
    describe(testName + ".selectBorrowedUsersByBookId test", () =>{
        let mockFn = jest.spyOn(borrowMapper, "selectBorrowedUsersByBookId");

        function baseTest(id: number, status: string, re?: IBorrowHistory[]){
            test(status + ' test', (done) =>{
                changeParamQuery(status, re);
                borrowMapper.selectBorrowedUsersByBookId(id, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }

        baseTest(100, IResult.FAIL);                // 查询失败
        baseTest(1, IResult.SUCCESS, history);      // 查询成功
    })

    // 查找用户借阅记录
    describe(testName + ".selectBorrowedBooksByUserId test", () =>{
        let mockFn = jest.spyOn(borrowMapper, "selectBorrowedBooksByUserId");

        function baseTest(id: number, status: string, re?: IBorrowHistory[]){
            test(status + ' test', (done) =>{
                changeParamQuery(status, re);
                borrowMapper.selectBorrowedBooksByUserId(id, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }

        baseTest(100, IResult.FAIL);                // 查询失败
        baseTest(1, IResult.SUCCESS, history);      // 查询成功
    })

    // 插入借阅记录
    describe(testName + "borrowMapper.insertOne test", () =>{
        let mockFn = jest.spyOn(borrowMapper, "insertOne");

        function baseTest(userId: number, bookId: number, status: string){
            test(status + ' test', (done) =>{
                changeParamQuery(status);
                borrowMapper.insertOne(userId, bookId, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }

        baseTest(100, 100, IResult.ERROR);      // 插入异常
        baseTest(1, 1, IResult.SUCCESS);        // 插入成功
    })
})