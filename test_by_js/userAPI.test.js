const frisby = require("frisby");
// const joi = frisby.joi;

describe("userAPI test path:/books", () =>{
    const testName = "userAPI";

    // 查询所有用户
    describe(testName + " / get test", () =>{
        test("success test",  async () =>{
            return frisby.get("http://localhost:3000/users")
                .expect("status", 200)
                .expect("json", {"status": "success"});
        });
    });

    // 根据id查询用户
    describe(testName + " /:id get test", () =>{
        test("invalid param test",  async () =>{
            return frisby.get("http://localhost:3000/users/s")
                .expect("status", 400)
                .expect("json", {"status": "error"});
        });

        test("success test", async () => {
            return frisby.get("http://localhost:3000/users/1")
                .expect("status", 200)
                .expect("json", {"status": "success"});
        });
    })

    // 新建用户
    describe(testName + " / post test", () =>{
        test("invalid param test", async () => {
            return frisby.post("http://localhost:3000/users/", {name1: "cjt"})
                .expect("status", 400)
                .expect("json", {"status": "error"});
        });

        test("insert error test", async () => {
            return frisby.post("http://localhost:3000/users/", {name: "jack"})
                .expect("status", 200)
                .expect("json", {"status": "error"});
        });

        test("success test", async () => {
            return frisby.post("http://localhost:3000/users/", {name: "cjt"})
                .expect("status", 200)
                .expect("json", {"status": "success"});
        });
    })
})