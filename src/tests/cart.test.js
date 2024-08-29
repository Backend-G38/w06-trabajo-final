require("../models")

const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")

const URL_BASE_USERS_LOGIN = '/api/v1/users/login'
const URL_BASE = "/api/v1/cart"

let TOKEN
let productBody
let bodyCart
let product
let userId
let cartId


beforeAll(async () => {
  const user = {
    email: "juan@gmail.com",
    password: "juan1234"
  }
  const res = await request(app)
    .post(URL_BASE_USERS_LOGIN)
    .send(user)


  TOKEN = res.body.token
  userId = res.body.user.id

  productBody = {
    title: "productTest",
    description: "lorem20",
    price: 23
  }

  product = await Product.create(productBody)

  bodyCart = {
    quantity: 1,
    productId: product.id
  }

})

test("POST -> 'URL_BASE', should return status code 201 and res.body.quantity === bodyCart.quantity", async () => {

  const res = await request(app)
    .post(URL_BASE)
    .send(bodyCart)
    .set("Authorization", `Bearer ${TOKEN}`)

  cartId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(bodyCart.quantity)
  expect(res.body.userId).toBe(userId)
})

test("GET -> 'URL_BASE',should return status code 200 and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_BASE)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].userId).toBeDefined()
  expect(res.body[0].userId).toBe(userId)

  expect(res.body[0].product).toBeDefined()
  expect(res.body[0].productId).toBe(product.id)
  expect(res.body[0].product.id).toBe(product.id)


  // expect(res.body[0].product.productImgs).toBeDefined()
  // expect(res.body[0].product.productImgs).toHaveLength(0)

})

test("GET -> 'URL_BASE/:id',should return status code 200 and res.body.quantity === cart.quantity", async () => {
  const res = await request(app)
    .get(`${URL_BASE}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(bodyCart.quantity)

  expect(res.body.userId).toBeDefined()
  expect(res.body.userId).toBe(userId)

  expect(res.body.product).toBeDefined()
  expect(res.body.productId).toBe(product.id)
  expect(res.body.product.id).toBe(product.id)


  // expect(res.body[0].product.productImgs).toBeDefined()
  // expect(res.body[0].product.productImgs).toHaveLength(0)

})

test("PUT -> 'URL_BASE/:id',should return status code 200 and res.body.quantity === bodyUpdate.quantity", async () => {
  const bodyUpdate = {
    quantity: 2
  }

  const res = await request(app)
    .put(`${URL_BASE}/${cartId}`)
    .send(bodyUpdate)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(bodyUpdate.quantity)

})


test("DELETE -> 'URL_BASE/:id',should return status code 204", async () => {

  const res = await request(app)
    .delete(`${URL_BASE}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
  await product.destroy()
})


