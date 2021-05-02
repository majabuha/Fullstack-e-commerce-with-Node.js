const conn = require('../database/db');

//add product into the database
function dbAddProduct(req, res) {
    const product = conn.db.get('products')
                           .map('id')
                           .value()
                           .includes(parseInt(req.body.id))
    //statement:product already exists
    if (product) {
        res.status(409).json({
            message: "Product already exists in database!"
        });

        //statement:add product in products database
    } else {
        const dbProduct = req.body;
        conn.db.get('products').push(dbProduct).write();
        res.status(200).json({
            status: 'success',
            message: 'Product added to database!'
        });
    };
};

//remove product function
function dbRemoveProduct(req, res) {
    const product = conn.db.get('products')
                           .map('id')
                           .value()
                           .includes(parseInt(req.params.id));

    //statement:product with specific id does not exist to be deleted
    if (!product) {
        res.status(404).json({
            message: "Product does not exist in the database!"
        });

        //statement:delete product
    } else {
        const product = conn.db.get('products')
                               .remove({ id: parseInt(req.params.id) })
                               .write()
        res.json(product);
    };
};

//get all products from product database
function allProducts(req, res) {
    const products = conn.db.get('products').value();
    res.json(products)
};

//exporting functions
exports.dbAddProduct = dbAddProduct;
exports.dbRemoveProduct = dbRemoveProduct;
exports.allProducts = allProducts;