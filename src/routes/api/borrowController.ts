import { Router, Request, Response, NextFunction } from "express";
var router = Router();

import { IResult } from "../../types/entity";
import { borrowMapper } from "../../mapper/borrowMapper";
let mapper = new borrowMapper;

/* 新建借阅记录 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    var params = req.body;
    var user_id = params.user_id;
    var book_id = params.book_id;
    // 判断参数是否合法
    if(! user_id || ! book_id || isNaN(Number(user_id)) || isNaN(Number(book_id))){
        res.status(400);
        res.json(IResult.getFailResult("参数错误"));
        return;
    }
    // 插入记录
    mapper.insertOne(user_id, book_id, (re:IResult) =>{
        res.json(re);
    })
});

export default router;