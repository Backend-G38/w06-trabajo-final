const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const path = require('path')
const fs = require('fs')

const getAll = catchError(async (req, res) => {
  const results = await ProductImg.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const { filename } = req.file
  // console.log(filename);
  // console.log(req.protocol);//http
  // console.log(req.headers.host); //localhost:8080
  // console.log();
  const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`
  const result = await ProductImg.create({ filename, url })
  return res.status(201).json(result)
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const image = await ProductImg.findByPk(id)
  if (!image) return res.sendStatus(404)
  const imagePath = path.join(__dirname, '..', 'public', 'uploads', `${image.filename}`)
  fs.unlinkSync(imagePath)
  await image.destroy();
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  create,
  remove,
}