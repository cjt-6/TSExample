const {
    MYSQL_HOST: HOST,           
    MYSQL_PORT: PORT,           
    MYSQL_USER: USER,          
    MYSQL_PASSWORD: PASSWORD,  
    MYSQL_DB: DB,        
} = process.env;

// 环境变量配置
const dbConfig = {
    host: HOST,        
    port: 3306,        
    user: USER,        
    password: PASSWORD,
    database: DB,      
}
export default dbConfig;

// // 基础配置
// const dbConfig = {
//     host: 'typescript-mysql-1',     // docker连接可以写host.docker.internal
//     port: 3306,                     // MySQL 默认端口为 3306
//     user: 'root',                   // 账号
//     password: '123456',             // 密码
//     database: 'book_manage',        // 数据库
// }
// export default dbConfig;


