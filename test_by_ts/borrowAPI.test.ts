import { describe, expect, jest, test} from '@jest/globals';
import { IResult } from '../src/types/entity';
import app from '../src/app';
import request from "supertest";

let testName = "borrowController";

describe(testName + " test path:/browser", () =>{

    // 插入借阅记录
    describe(testName + " / post test", () =>{
        test("success test", async () => {

            const response = await request(app).post("/borrow")
                .send({user_id: 1, book_id: 1});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });

        test("invalid param test", async () => {
            const response = await request(app).post("/borrow")
                .send({user_id: 1, book_id: "ss"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });
    })


    // 通过用户id查询所有图书借阅记录
    describe(testName + " /:id/books get test", () =>{

        test("success test", async () => {
            const response = await request(app).get("/borrow/1/books");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });

        test("invalid param test", async () => {
            const response = await request(app).get("/borrow/ss/books");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });
    })

    // 通过图书id查询所有用户借阅记录
    describe(testName + " /:id/users get test", () =>{

        test("success test", async () => {
            const response = await request(app).get("/borrow/1/users");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });

        test("invalid param test", async () => {
            const response = await request(app).get("/borrow/ss/users");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });
    })
})