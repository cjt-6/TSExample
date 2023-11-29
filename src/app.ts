// 第三方模块 
import bodyParser from 'body-parser'; 
import express from 'express'; 
import { NextFunction, Request, Response } from 'express'; 

// 自定义模块 
import  systemConfig  from './config/sysConfig';

// 导入路由
import usersRouter from './routes/user/userController'
import booksRouter from './routes/book/bookController'
import borrowRouter from './routes/borrow/borrowController'

const app = express(); 

// 处理 post 请求的请求体，限制大小最多为 20 兆 
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true })); 
app.use(bodyParser.json({ limit: '20mb' })); 

// error handler 
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) { 
    return res.sendStatus(500); 
}); 

app.listen(systemConfig.port, "0.0.0.0", function() { 
    console.log(`the server is start at port ${systemConfig.port}`); 
}); 

// 首页
app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
})

// 使用json解析
app.use(express.json());

// 引用路由
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/borrow', borrowRouter);

export default app;
