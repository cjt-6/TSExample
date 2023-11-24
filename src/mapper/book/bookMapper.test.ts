import { describe, expect, jest, test} from '@jest/globals';
import bookMapper from './bookMapper';
import { IBook, IResult } from '../../types/entity';
import dbconn from "../../utils/dbconn"

// mock方法测试
let testName: string = "bookMapper";

describe(testName + " test", () =>{

    let books: IBook[] = [{id: 1, bookname: "book1"}, {id: 2, bookname: "book2"}];
    let book: IBook[] = [{id: 1, bookname: "book"}];

    // 模拟query
    function changeNoneQuery(status: string, re?: IBook[]){
        (dbconn.query as any) = jest.fn((query: string, callback: any) => {
            if(status == IResult.ERROR)
                callback(status, null);
            else
                if(re)
                    callback(null, re);
                else
                    callback(null, []);
        });
    }
    function changeParamQuery(status: string, re?: IBook[]){
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

    // 查询所有图书
    describe(testName + ".selectAll test", () =>{
        let mockFn = jest.spyOn(bookMapper, "selectAll");

        function baseTest(status: string, re?: IBook[]){
            test(status + ' test', (done) =>{
                changeNoneQuery(status, re);
                bookMapper.selectAll((re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }
        baseTest(IResult.SUCCESS, books);       // 查询成功
        baseTest(IResult.FAIL);                 // 查询失败
    })
    
    
    // 根据id查找图书
    describe(testName + ".selectOneById test", () =>{
        let mockFn = jest.spyOn(bookMapper, "selectOneById");

        function baseTest(id: number, status: string, re?: IBook[]){
            test(status + ' test', (done) =>{
                changeParamQuery(status, re);
                bookMapper.selectOneById(id, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }
        baseTest(1, IResult.SUCCESS, book);     // 查询成功
        baseTest(1, IResult.FAIL);              // 查询失败
    })


    // 根据bookname查找图书
    describe(testName + ".selectOneByName test", () =>{
        let mockFn = jest.spyOn(bookMapper, "selectOneByName");

        function baseTest(name: string, status: string, re?: IBook[]){
            test(status + ' test', (done) =>{
                changeParamQuery(status, re);
                bookMapper.selectOneByName(name, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }
        baseTest("book1", IResult.SUCCESS, book);       // 查询成功
        baseTest("1", IResult.FAIL);                    // 查询失败
    })
    

    // 插入图书
    describe(testName + ".insertOne test", () =>{
        let mockFn = jest.spyOn(bookMapper, "insertOne");

        function baseTest(name: string, status: string){
            test(status + ' test', (done) =>{
                changeParamQuery(status);
                bookMapper.insertOne(name, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }

        baseTest("book3", IResult.SUCCESS);         // 插入成功
        baseTest("book1", IResult.ERROR);           // 插入异常
    })
})