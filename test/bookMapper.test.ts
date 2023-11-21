import {afterAll, afterEach, describe, expect, jest, test} from '@jest/globals';
import { bookMapper } from '../src/mapper/bookMapper';
import { IResult } from '../src/types/entity';
import dbconn from "../src/utils/dbconn"
const mapper = new bookMapper;

// mock方法测试
describe("bookMapper test", () =>{
    // 保存query方法的初始状态
    let originalQueryFunction = dbconn.query;

    // 模拟query失败的情况
    function changeNoneQuery(){
        (dbconn.query as any) = jest.fn((query: string, callback: any) => {
            callback(IResult.ERROR, null);
        });
    }
    function changeParamQuery(){
        (dbconn.query as any) = jest.fn((query: string, values: any, callback: any) => {
            callback(IResult.ERROR, null);
        });
    }

    // 回退query方法
    afterEach(() =>{
        dbconn.query = originalQueryFunction;
    })

    enum Methods{
        "insertOne",
        ""
    }
    // 想要做一个反射，但不会
    function baseTest(status: string, method: keyof bookMapper){
        let mockFn = jest.spyOn(mapper, method);
        test(status + ' test', (done) =>{
            mapper.selectAll((re:IResult) =>{
                expect(mockFn).toBeCalled();
                expect(re.status).toEqual(status);
                done();
            });      
        });
    }


    // 查询所有图书
    describe("bookMapper.selectAll test", () =>{
        let mockFn = jest.spyOn(mapper, "selectAll");

        function baseTest(status: string, isError: boolean){
            test(status + ' test', (done) =>{
                if(isError)
                    changeNoneQuery();
                mapper.selectAll((re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toEqual(status);
                    done();
                });      
            });
        }

        baseTest(IResult.SUCCESS, false);   // 查询成功
        baseTest(IResult.ERROR, true)       // 查询异常
    })
    
    
    // 根据id查找图书
    describe("bookMapper.selectOneById test", () =>{
        let mockFn = jest.spyOn(mapper, "selectOneById");

        function baseTest(id: number, status: string, isError: boolean){
            test(status + ' test', (done) =>{
                if(isError)
                    changeParamQuery();
                mapper.selectOneById(id, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toEqual(status);
                    done();
                });      
            });
        }

        baseTest(100, IResult.FAIL, false)      // 查询失败
        baseTest(1, IResult.SUCCESS, false)     // 查询成功
        baseTest(1, IResult.ERROR, true)        // 查询异常
    })


    // 根据bookname查找图书
    describe("bookMapper.selectOneByName test", () =>{
        let mockFn = jest.spyOn(mapper, "selectOneByName");

        function baseTest(name: string, status: string, isError: boolean){
            test(status + ' test', (done) =>{
                if(isError)
                    changeParamQuery();
                mapper.selectOneByName(name, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toEqual(status);
                    done();
                });      
            });
        }

        baseTest("none", IResult.FAIL, false)       // 查询失败
        baseTest("book1", IResult.SUCCESS, false)   // 查询成功
        baseTest("book1", IResult.ERROR, true)      // 查询异常
    })

    // 插入图书
    describe("bookMapper.insertOne test", () =>{
        let mockFn = jest.spyOn(mapper, "insertOne");

        function baseTest(name: string, status: string, isError: boolean){
            test(status + ' test', (done) =>{
                if(isError)
                    changeParamQuery();
                mapper.insertOne(name, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toEqual(status);
                    done();
                });      
            });
        }

        baseTest("book3", IResult.SUCCESS, false) // 插入成功
        baseTest("book1", IResult.ERROR, true)    // 插入异常
    })


    // 查找图书借阅记录
    describe("bookMapper.selectBorrowedUsersByBookId test", () =>{
        let mockFn = jest.spyOn(mapper, "selectBorrowedUsersByBookId");

        function baseTest(id: number, status: string, isError: boolean){
            test(status + ' test', (done) =>{
                if(isError)
                    changeParamQuery();
                mapper.selectBorrowedUsersByBookId(id, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toEqual(status);
                    done();
                });      
            });
        }

        baseTest(100, IResult.FAIL, false)      // 查询失败
        baseTest(1, IResult.SUCCESS, false)     // 查询成功
        baseTest(1, IResult.ERROR, true)        // 查询异常
    })  
})