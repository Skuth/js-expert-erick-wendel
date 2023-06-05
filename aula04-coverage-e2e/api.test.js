const { describe, it } = require("mocha")
const request = require("supertest")
const assert = require("assert")

const app = require("./api")

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contat page and return HTTP Status 200", async () => {
      const response = await request(app)
        .get("/contact")
        .expect(200)

        assert.deepStrictEqual(response.text, "Contact us page")
    })
  })

  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app)
        .get("/hi")
        .expect(200)

      assert.deepStrictEqual(response.text, "Hello Apenas")
    })
  })

  describe("/login", () => {
    it("should login successfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Skuth", password: "123123" })
        .expect(200)

      assert.deepStrictEqual(response.text, "Loggin has succeeded!")
    })

    it("should unauthorie a request when requesting it using wrong credentials and return HTTP Status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "TheSkuth", password: "123" })
        .expect(401)

      assert.deepStrictEqual(response.text, "Loggin failed!")
    })
  })
})