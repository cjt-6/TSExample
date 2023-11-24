import { describe, expect, test} from '@jest/globals';
import { IResult } from '../src/types/entity';
import app from '../src/app';
import request from "supertest";

let testName = "bookController";

describe(testName + " test path:/books", () =>{

    // 查询所有图书
    describe(testName + " / get test", () =>{
        test("success test",  async () => {
            const response = await request(app).get("/books");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });
    });

    // 根据id查询图书
    describe(testName + " /:id get test", () =>{

        test("invalid param test", async () => {
            const response = await request(app).get("/books/1s");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });

        test("success test", async () => {
            const response = await request(app).get("/books/1");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });
    })

    // 新建图书
    describe(testName + " / post test", () =>{

        test("invalid param test", async () => {
            const response = await request(app).post("/books")
                .send({name1: "book1"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });

        test("success test", async () => {
            const response = await request(app).post("/books")
                .send({name: "book3"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });

    })

})