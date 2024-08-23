const request = require("supertest")
const app = require('../app')
const Category = require("../models/Category")

let TOKEN
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'

let product

beforeAll(async () => {
  const hits = {
    email: "juan@gmail.com",
    password: "juan1234",
  }

  const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(hits)

  TOKEN = res.body.token
  // console.log(TOKEN);s

  const category = await Category.create({ name: 'ropa para dama' })

  product = {
    title: 'Jeans blue dama',
    description: 'lorem 20',
    price: 12.20,
    categoryId: category.id
  }
})

test("POST -> 'BASE_URL', should return status code 201, and res.body.title === product.title", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization')


})