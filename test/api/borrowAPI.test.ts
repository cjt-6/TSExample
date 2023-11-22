import { afterEach, describe, expect, jest, test} from '@jest/globals';
import { IResult } from '../../src/types/entity';
import app from "../../src/app"
import request from "supertest";
import { borrowMapper } from '../../src/mapper/borrowMapper';
import dbconn from '../../src/utils/dbconn';

let mapper = new borrowMapper();

describe("borrowAPI test path:/browser", () =>{

    let originalQueryFunction = dbconn.query;

    // 模拟insert成功的情况
    function changeInsertQuery(){
        (dbconn.query as any) = jest.fn((query: string, values: any, callback: any) => {
            callback(null, null);
        });
    }

    // 回退query方法
    afterEach(() =>{
        dbconn.query = originalQueryFunction;
    })

    describe("borrowController / post test", () =>{
        test("success test", async () => {
            // 模拟插入
            changeInsertQuery();

            const response = await request(app).post("/browser")
                .send({user_id: 1, book_id: 1});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.SUCCESS);
        });

        test("invalid param test", async () => {
            const response = await request(app).post("/browser")
                .send({user_id: 1, book_id: "ss"});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });

        test("insert error test",  async () => {
            const response = await request(app).post("/browser")
                .send({user_id: 100, book_id: 100});
            let re:IResult  = response.body;
            expect(re.status).toBe(IResult.ERROR);
        });
    })
})