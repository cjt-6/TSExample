import { Router, Request, Response, NextFunction } from "express";
var router = Router();

import { IResult } from "../../types/entity";
import bookMapper from "../../mapper/bookMapper";
  
/* 新建图书 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    var params = req.body;
    var name = params.name;
    // 判断参数是否合法
    if(! name){
        res.status(400).json(IResult.getErrorResult("参数错误"));
        return;
    }
    // 判断是否存在，也可以通过数据库限定值唯一
    bookMapper.selectOneByName(name, (re:IResult) =>{
        if(re.status == "success"){
            res.json(IResult.getFailResult("图书已存在"));
        }
        else{
            bookMapper.insertOne(name, (re:IResult) =>{
                res.json(re);
            })
        }
    });
});

/* 查找所有图书 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    bookMapper.selectAll((re: IResult) =>{
        res.json(re);
    })
})

/* 查找指定图书 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) =>{
    let id = req.params.id;
    if(isNaN(Number(id))){
        res.json(IResult.getErrorResult("参数错误"));
        return;
    }
    bookMapper.selectOneById(Number(id), (re: IResult) =>{
        res.json(re);
    })
});

/* 通过bookid查询所有借阅用户 */
router.get('/:id/users', (req: Request, res: Response, next: NextFunction) =>{
    let id = req.params.id;
    if(isNaN(Number(id))){
        res.json(IResult.getErrorResult("参数错误"));
        return;
    }
    bookMapper.selectBorrowedUsersByBookId(Number(id), (re: IResult) =>{
        res.json(re);
    })
});

export default router;