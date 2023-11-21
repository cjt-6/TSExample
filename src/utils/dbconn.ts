import mysql from 'mysql';

// 获取数据库配置信息
import dbConfig from '../config/dbconfig';

// 创建连接池
let pool = mysql.createPool(dbConfig)

pool.on('connection', msg => {
    // console.log(msg);
})
pool.on('error', err => {
    console.log('database connection error!');
})
pool.off("off", msg =>{
    console.log("database off!");
})
export default pool;