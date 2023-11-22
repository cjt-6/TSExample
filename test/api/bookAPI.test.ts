import { afterEach, describe, expect, jest, test} from '@jest/globals';
import { IResult } from '../../src/types/entity';
import app from "../../src/app"
import request from "supertest";
import bookMapper from '../../src/mapper/bookMapper';

describe("bookAPI test path:/books", () =>{
    const testName: string = "bookController";
    let originalInsertFunction = bookMapper.selectOneByName;

    function changeselectOneByNameQuery(){
        (bookMapper.selectOneByName as any) = jest.fn((name: string, callback: any) => {
            callback(IResult.getFailResult());
        });
    }

    afterEach( () =>{
        bookMapper.insertOne = originalInsertFunction;
    })

    // 查询所有图书
    describe(testName + " / get test", () =>{
        test("success test",  async () => {
            const response = await request(app).get("/books");
            let re:IResult  = response.body;
            // console.log("🚀 ~ file: bookAPI.test.ts:14 ~ test ~ re:", re)
            expect(re.status).toBe(IResult.SUCCESS);
        });
    });

    // 根据id查询图书
    describe(testName + " /:id get test", () =>{
        test("invalid param test", async () => {
            const response = await request(app).get("/books/1s");
            let re:IResult  = response.body;
            // console.log("🚀 ~ file: bookAPI.test.ts:22 ~ test ~ re:", re)
            expect(re.status).toBe(IResult.ERROR);
        });

        test("success test", async () => {
            const response = await request(app).get("/books/1");
            let re:IResult  = response.body;
            // console.log("🚀 ~ file: bookAPI.test.ts:29 ~ test ~ re:", re)
            expect(re.status).toBe(IResult.SUCCESS);
        });
    })

    // 通过图书id查询借阅的所有用户
    describe(testName + " /:id/users get test", () =>{
        test("invalid param test", async () => {
            const response = await request(app).get("/books/1s/users");
            let re:IResult  = response.body;
            // console.log("🚀 ~ file: bookAPI.test.ts:40 ~ test ~ re:", re)
            expect(re.status).toBe(IResult.ERROR);
        });

        test("success test", async () => {
            const response = await request(app).get("/books/1/users");
            let re:IResult  = response.body;
            // console.log("🚀 ~ file: bookAPI.test.ts:47 ~ test ~ re:", re)
            expect(re.status).toBe(IResult.SUCCESS);
        });
    })

    // 新建图书
    describe(testName + " / post test", () =>{
        test("invalid param test", async () => {
            const response = await request(app).post("/books")
                .send({name1: "book1"});
            let re:IResult  = response.body;
            // console.log("🚀 ~ file: bookAPI.test.ts:56 ~ test ~ re:", re);
            expect(re.status).toBe(IResult.ERROR);
        });

        test("fail test", async () => {
            const response = await request(app).post("/books")
                .send({name: "book1"});
            let re:IResult  = response.body;
            // console.log("🚀 ~ file: bookAPI.test.ts:64 ~ test ~ re:", re)
            expect(re.status).toBe(IResult.FAIL);
        });

        test("success test", async () => {
            changeselectOneByNameQuery();
            const response = await request(app).post("/books")
                .send({name: "book1"});
            let re:IResult  = response.body;
            // console.log("🚀 ~ file: bookAPI.test.ts:72 ~ test ~ re:", re)
            expect(re.status).not.toBe(IResult.FAIL);
        });
    })
})