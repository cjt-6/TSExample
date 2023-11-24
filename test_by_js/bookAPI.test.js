const frisby = require("frisby");
// const joi = frisby.joi;

describe("bookAPI test path:/books", () =>{
    const testName = "bookAPI";

    // 查询所有图书
    describe(testName + " / get test", () =>{
        test("success test",  async () =>{
            return frisby.get("http://localhost:3000/books")
                .expect("status", 200)
                .expect("json", {"status": "success"});
        });
    });

    // 根据id查询图书
    describe(testName + " /:id get test", () =>{
        test("invalid param test",  async () =>{
            return frisby.get("http://localhost:3000/books/s")
                .expect("status", 400)
                .expect("json", {"status": "error"});
        });

        test("success test", async () => {
            return frisby.get("http://localhost:3000/books/1")
                .expect("status", 200)
                .expect("json", {"status": "success"});
        });
    })

    // 新建图书
    describe(testName + " / post test", () =>{
        test("invalid param test", async () => {
            return frisby.post("http://localhost:3000/books/", {name1: "book1"})
                .expect("status", 400)
                .expect("json", {"status": "error"});
        });

        test("insert error test", async () => {
            return frisby.post("http://localhost:3000/books/", {name: "book1"})
                .expect("status", 200)
                .expect("json", {"status": "error"});
        });

        test("success test", async () => {
            return frisby.post("http://localhost:3000/books/", {name: "book3"})
                .expect("status", 200)
                .expect("json", {"status": "success"});
        });
    })
})