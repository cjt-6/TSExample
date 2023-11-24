const frisby = require("frisby");
// const joi = frisby.joi;

let testName = "borrowAPI";

describe(testName + " test path:/borrorw", () =>{

    // 插入借阅记录
    describe(testName + " / post test", () =>{
        test("success test",  async () =>{
            let param = {user_id: 1, book_id: 1};
            return frisby.post("http://localhost:3000/borrow", param)
                .expect("status", 200)
                .expect("json", {"status": "success"});
        });

        test("insert error test",  async () =>{
            let param = {user_id: 100, book_id: 100};
            return frisby.post("http://localhost:3000/borrow", param)
                .expect("status", 200)
                .expect("json", {"status": "error"});
        });

        test("invalid param test", async () => {
            let param = {user_id: 1, book_id: "s"};
            return frisby.post("http://localhost:3000/borrow", param)
                .expect("status", 400)
                .expect("json", {"status": "error"});
        });
    })


    // 通过用户id查询所有图书借阅记录
    describe(testName + " /:id/books get test", () =>{

        test("success test", async () => {
            return frisby.get("http://localhost:3000/borrow/1/books")
                .expect("status", 200)
                .expect("json", {"status": "success"});
        });

        test("invalid param test", async () => {
            return frisby.get("http://localhost:3000/borrow/1s/books")
                .expect("status", 400)
                .expect("json", {"status": "error"});
        });
    })

    // 通过图书id查询所有用户借阅记录
    describe(testName + " /:id/users get test", () =>{

        test("success test", async () => {
            return frisby.get("http://localhost:3000/borrow/1/users")
                .expect("status", 200)
                .expect("json", {"status": "success"});
        });

        test("invalid param test", async () => {
            return frisby.get("http://localhost:3000/borrow/1s/users")
                .expect("status", 400)
                .expect("json", {"status": "error"});
        });
    })
})