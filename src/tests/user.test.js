const request = require("supertest")
const app = require('../app')

const BASE_URL = '/api/v1/users'
let TOKEN

beforeAll(async () => {
  const user = {
    email: "juan@gmail.com",
    password: "juan1234"
  }
  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)
  TOKEN = res.body.token
  console.log(TOKEN);
})


const user = {
  firstName: "Iuvil",
  lastName: "Pena",
  email: "iuvil@gmail.com",
  password: "iuvil1234",
  phone: "+575312323"
}

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () => {

  const columns = ['firstName', 'lastName', 'email', 'password', 'phone']
  const res = await request(app)
    .post(BASE_URL)
    .send(user)

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  // columns.forEach((column) => {
  // })
  expect(res.body.firstName).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)
})





























































