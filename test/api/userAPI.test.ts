import { afterEach, beforeAll, describe, expect, jest, test} from '@jest/globals';
import { IResult } from '../../src/types/entity';
import appp from "../../src/app"
import request from "supertest";
import userMapper from '../../src/mapper/userMapper';
import { Express } from 'express-serve-static-core';
 
describe("userAPI test path:/users", () =>{
    const testName: string = "userController";
    let originalInsertFunction = userMapper.selectOneByName;
    let app: Express;

    function changeselectOneByNameQuery(){
        (userMapper.selectOneByName as any) = jest.fn((name: string, callback: any) => {
            callback(IResult.getFailResult());
        });
    }

    beforeAll( async () =>{
        app = appp;
    })

    afterEach( () =>{
        userMapper.insertOne = originalInsertFunction;
    })

    // 查询所有用户
    describe(testName + " / get test", () =>{
        test("success test",  async () => {
            const response = await request(app).get("/users");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });
    });

    // 根据id查询用户
    describe(testName + " /:id get test", () =>{
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

    // 通过用户id查询借的所有图书
    describe(testName + " /:id/users get test", () =>{
        test("invalid param test", async () => {
            const response = await request(app).get("/users/1s/books");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });

        test("success test", async () => {
            const response = await request(app).get("/users/1/books");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });
    })

    // 新建用户
    describe(testName + " / post test", () =>{
        test("invalid param test", async () => {
            const response = await request(app).post("/users")
                .send({name1: "jack"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });

        test("fail test", async () => {
            const response = await request(app).post("/users")
                .send({name: "jack"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.FAIL);
        });

        test("success test", async () => {
            changeselectOneByNameQuery();
            const response = await request(app).post("/users")
                .send({name: "jack"});
            let re:IResult  = response.body;
            expect(re.status).not.toBe(IResult.FAIL);
        });
    })
})