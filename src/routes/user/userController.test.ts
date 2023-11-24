import { describe, expect, jest, test} from '@jest/globals';
import { IResult } from '../../types/entity';
import app from '../../app';
import request from "supertest";
import userMapper from '../../mapper/user/userMapper';

let testName = "userController";

describe(testName + " test path:/users", () =>{

    // 查询所有用户
    describe(testName + " / get test", () =>{
        // 模拟查询
        (userMapper.selectAll as any) = jest.fn((callback: any) =>{
            callback(IResult.getSuccessResult());
        })
        test("success test",  async () => {
            const response = await request(app).get("/users");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });
    });

    // 根据id查询用户
    describe(testName + " /:id get test", () =>{
        // 模拟查询
        (userMapper.selectOneById as any) = jest.fn((id: number, callback:any) =>{
            callback(IResult.getSuccessResult());
        });

        test("invalid param test", async () => {
            const response = await request(app).get("/users/1s");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });

        test("success test", async () => {
            const response = await request(app).get("/users/1");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });
    })

    // 新建用户
    describe(testName + " / post test", () =>{
        // 模拟插入
        (userMapper.insertOne as any) = jest.fn((username: string, callback:any) =>{
            callback(IResult.getSuccessResult());
        });

        test("invalid param test", async () => {
            const response = await request(app).post("/users")
                .send({name1: "cjt"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });

        test("success test", async () => {
            const response = await request(app).post("/users")
                .send({name: "cjt"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });

    })

})