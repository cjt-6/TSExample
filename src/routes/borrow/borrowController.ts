import { Router, Request, Response, NextFunction } from "express";
var router = Router();

import { IResult } from "../../types/entity";
import borrowMapper from "../../mapper/borrow/borrowMapper";

/* 新建借阅记录 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    var params = req.body;
    var user_id = params.user_id;
    var book_id = params.book_id;
    // 判断参数是否合法
    if(! user_id || ! book_id || isNaN(Number(user_id)) || isNaN(Number(book_id))){
        res.status(400).json(IResult.getErrorResult("参数错误"));
        return;
    }
    // 插入记录
    borrowMapper.insertOne(user_id, book_id, (re:IResult) =>{
        res.json(re);
    })
});

/* 通过用户id查询所有图书借阅记录 */
router.get('/:id/books', (req: Request, res: Response, next: NextFunction) =>{
    let id = req.params.id;
    if(isNaN(Number(id))){
        res.status(400).json(IResult.getErrorResult("参数错误"));
        return;
    }
    borrowMapper.selectBorrowedBooksByUserId(Number(id), (re: IResult) =>{
        res.json(re);
    })
});

/* 通过图书id查询所有用户借阅记录 */
router.get('/:id/users', (req: Request, res: Response, next: NextFunction) =>{
    let id = req.params.id;
    if(isNaN(Number(id))){
        res.status(400).json(IResult.getErrorResult("参数错误"));
        return;
    }
    borrowMapper.selectBorrowedUsersByBookId(Number(id), (re: IResult) =>{
        res.json(re);
    })
});

export default router;