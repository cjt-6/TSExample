// User类型
export interface IUser{
    id: number,
    username: string,
}

// Book类型
export interface IBook{
    id: number,
    bookname: string,
}

// BorrowHistory类型
export interface IBorrowHistory{
    id: number,
    userId: number,
    bookId:number,
}

// 存储用户的借阅历史
export interface IBorrowOfUser{
    user: IUser, 
    books: IBook[],
    time: Date,
}

// 存储图书的借阅历史
export interface IBorrowOfBook{
    book: IBook, 
    users: IUser[],
    time: Date,
}

// Result类型
export class IResult{
    status: string = "";
    message: any = "";
    data: any = null;

    constructor(status?: string, message?: any, data?: any){
        if (status)
            this.status = status;
        if (message)
            this.message = message;
        if (data)
            this.data = data;
    }

    // 得到错误返回结果
    static getErrorResult(message?:any){
        return new IResult("error", message, null);
    }

    // 得到正确返回结果
    static getSuccessResult(data?:any){
        return new IResult("success", null, data);
    }
}