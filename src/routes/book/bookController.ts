import { Router, Request, Response, NextFunction } from "express";
var router = Router();

import { IResult } from "../../types/entity";
import bookMapper from "../../mapper/book/bookMapper";
  
/* 新建图书 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    var params = req.body;
    var name = params.name;
    // 判断参数是否合法
    if(! name){
        res.status(400).json(IResult.getErrorResult("参数错误"));
        return;
    }
    bookMapper.insertOne(name, (re:IResult) =>{
        res.json(re);
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
        res.status(400).json(IResult.getErrorResult("参数错误"));
        return;
    }
    bookMapper.selectOneById(Number(id), (re: IResult) =>{
        res.json(re);
    })
});



export default router;