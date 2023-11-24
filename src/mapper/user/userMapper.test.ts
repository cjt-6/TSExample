import { describe, expect, jest, test} from '@jest/globals';
import userMapper from './userMapper';
import { IUser, IResult } from '../../types/entity';
import dbconn from "../../utils/dbconn"

// mock方法测试
let testName = "userMapper";

describe(testName + " test", () =>{

    let users: IUser[] = [{id: 1, username: "jack"}, {id: 2, username: "tom"}];
    let user: IUser[] = [{id: 1, username: "lucy"}];

    // 模拟query
    function changeNoneQuery(status: string, re?: IUser[]){
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
    function changeParamQuery(status: string, re?: IUser[]){
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

    // 查询所有用户
    describe(testName + ".selectAll test", () =>{
        let mockFn = jest.spyOn(userMapper, "selectAll");

        function baseTest(status: string, re?: IUser[]){
            test(status + ' test', (done) =>{
                changeNoneQuery(status, re);
                userMapper.selectAll((re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }
        baseTest(IResult.SUCCESS, users);       // 查询成功
        baseTest(IResult.FAIL);                 // 查询失败
    })
    
    
    // 根据id查找图用户
    describe(testName + ".selectOneById test", () =>{
        let mockFn = jest.spyOn(userMapper, "selectOneById");

        function baseTest(id: number, status: string, re?: IUser[]){
            test(status + ' test', (done) =>{
                changeParamQuery(status, re);
                userMapper.selectOneById(id, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }
        baseTest(1, IResult.SUCCESS, user);     // 查询成功
        baseTest(1, IResult.FAIL);              // 查询失败
    })


    // 根据bookname查找用户
    describe(testName + ".selectOneByName test", () =>{
        let mockFn = jest.spyOn(userMapper, "selectOneByName");

        function baseTest(name: string, status: string, re?: IUser[]){
            test(status + ' test', (done) =>{
                changeParamQuery(status, re);
                userMapper.selectOneByName(name, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }
        baseTest("jack", IResult.SUCCESS, user);        // 查询成功
        baseTest("jack", IResult.FAIL);                 // 查询失败
    })
    

    // 插入用户
    describe(testName + ".insertOne test", () =>{
        let mockFn = jest.spyOn(userMapper, "insertOne");

        function baseTest(name: string, status: string){
            test(status + ' test', (done) =>{
                changeParamQuery(status);
                userMapper.insertOne(name, (re:IResult) =>{
                    expect(mockFn).toBeCalled();
                    expect(re.status).toBe(status);
                    done();
                });      
            });
        }

        baseTest("jack", IResult.SUCCESS);         // 插入成功
        baseTest("jack", IResult.ERROR);           // 插入异常
    })
})