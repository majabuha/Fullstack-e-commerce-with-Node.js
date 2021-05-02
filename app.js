const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const db = require('./database/db');
const order = require('./modules/cartManagment');
const productStatus = require('./modules/productManagment');

app.use(express.json());
app.use(cors());
db.initDatabase();

//get all of the products from database
app.get('/api/products', (req, res) => {
    productStatus.allProducts(req, res);
});

//add product to the products database
app.post('/api/products', (req, res) => {
    productStatus.dbAddProduct(req, res);
});

//remove product from the products database
app.delete('/api/products/:id', (req, res) => {
    productStatus.dbRemoveProduct(req, res);
});

//get all products in the cart
app.get('/api/cart', (req, res) => {
    order.cartProducts(req, res);    
});

//add product to the cart
app.post('/api/cart/:id', (req, res) => {
    order.addProduct(req, res);
});

//delete product from the cart
app.delete('/api/cart/:id', (req, res) => {
    order.removeProduct(req, res);
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile('public/index.html');
});

//port
app.listen(8000, () => {
    console.log('Server listening on 8000...');
});
