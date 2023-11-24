import { describe, expect, jest, test} from '@jest/globals';
import { IResult } from '../../types/entity';
import app from '../../app';
import request from "supertest";
import bookMapper from '../../mapper/book/bookMapper';

let testName = "bookController";

describe(testName + " test path:/books", () =>{

    // 查询所有图书
    describe(testName + " / get test", () =>{
        // 模拟查询
        (bookMapper.selectAll as any) = jest.fn((callback: any) =>{
            callback(IResult.getSuccessResult());
        })
        test("success test",  async () => {
            const response = await request(app).get("/books");
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });
    });

    // 根据id查询图书
    describe(testName + " /:id get test", () =>{
        // 模拟查询
        (bookMapper.selectOneById as any) = jest.fn((id: number, callback:any) =>{
            callback(IResult.getSuccessResult());
        });

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
        // 模拟插入
        (bookMapper.insertOne as any) = jest.fn((bookname: string, callback:any) =>{
            callback(IResult.getSuccessResult());
        });

        test("invalid param test", async () => {
            const response = await request(app).post("/books")
                .send({name1: "book1"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });

        test("success test", async () => {
            const response = await request(app).post("/books")
                .send({name: "book1"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });

    })

})