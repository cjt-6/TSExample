import {describe, expect, jest, test} from '@jest/globals';
import { userMapper } from '../src/mapper/userMapper';
import { IResult } from '../src/types/entity';
const mapper = new userMapper;

// 常规测试
describe("userMapper test", () =>{

    // 查询所有用户
    test('userMapper.selectAll test', (done) => {
        function callback(re:IResult) {
            expect(re.status).toBe(IResult.SUCCESS);
            done();
        }
        mapper.selectAll(callback);
    });

    // 根据id查找用户
    describe('userMapper.selectOneById test', () =>{
        test('found test', (done) => {
            function callback(re:IResult) {
                expect(re.status).toBe(IResult.SUCCESS);
                done();
            }
            mapper.selectOneById(1, callback);
        });
        test('not found test', (done) => {
            function callback(re:IResult) {
                expect(re.status).toBe(IResult.FAIL);
                done();
            }
            mapper.selectOneById(100, callback);
        });
    })

    // 根据username查找用户
    describe('userMapper.selectOneByName test', () =>{
        test('found test', (done) => {
            function callback(re:IResult) {
                expect(re.status).toBe(IResult.SUCCESS);
                done();
            }
            mapper.selectOneByName("jack", callback);
        });
        test('not found test', (done) => {
            function callback(re:IResult) {
                expect(re.status).toBe(IResult.FAIL);
                done();
            }
            mapper.selectOneByName("none", callback);
        });
    })

    // 查找用户借阅记录
    describe('userMapper.selectBorrowedBooksByUserId test', () =>{
        test('found test', (done) => {
            function callback(re:IResult) {
                expect(re.status).toBe(IResult.SUCCESS);
                done();
            }
            mapper.selectBorrowedBooksByUserId(1, callback);
        });
        test('not found test', (done) => {
            function callback(re:IResult) {
                expect(re.status).toBe(IResult.FAIL);
                done();
            }
            mapper.selectBorrowedBooksByUserId(100, callback);
        });
    })

    // 插入用户
    describe('userMapper.insertOne test', () =>{
        test('error test', (done) => {
            function callback(re:IResult) {
                expect(re.status).toBe(IResult.ERROR);
                done();
            }
            mapper.insertOne("jack", callback);
        });
        test('success test', (done) => {
            function callback(re:IResult) {
                expect(re.status).toBe(IResult.SUCCESS);
                done();
            }
            mapper.insertOne("cjt", callback);
        });
    })

});