import { describe, expect, jest, test} from '@jest/globals';
import { IResult } from '../src/types/entity';
import app from '../src/app';
import request from "supertest";

let testName = "userController";

describe(testName + " test path:/users", () =>{

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

    // 新建用户
    describe(testName + " / post test", () =>{

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