const conn = require('../database/db');

//function:add product into the cart
function addProduct(req, res) {
    const product = conn.db.get('products').map('id').value().includes(parseInt(req.params.id));
    const cart = conn.db.get('cart').map('id').value().includes(parseInt(req.params.id));

    //statement:product already exists
    if (cart) {
        res.status(409).json({
            message: 'Product already exists in cart!',
        });

        //statement:product does not exist
    } else if (!product) {
        res.status(404).json({
            message: 'Product with that id does not exist!',
        });

        //statement:add product in cart
    } else if (product && !cart) {
        const cartProduct = conn.db
            .get('products')
            .find({ id: parseInt(req.params.id) })
            .value();
        conn.db.get('cart').push(cartProduct).write();
        res.json({
            status: 'success',
            message: 'Product added to cart!',
        });
    }
}

//function:remove product from the cart
function removeProduct(req, res) {
    const product = conn.db.get('cart').map('id').value().includes(parseInt(req.params.id));

    //statement:product with specific id does not exist in cart
    if (!product) {
        res.status(404).json({
            message: 'Product does not exist in the cart!',
        });

        //statement:delete product from the cart
    } else {
        const cart = conn.db
            .get('cart')
            .remove({ id: parseInt(req.params.id) })
            .write();
        res.json(cart);
    }
}

//get all products from the cart
function cartProducts(req, res) {
    const cartStatus = conn.db.get('cart').value();
    console.log(cartStatus);
    if (cartStatus.length === 0) {
        res.json({
            message: 'No products to display!',
        });
    } else {
        res.json({
            status: 'success',
            message: 'Products avaliable in the cart:',
            data: { cartStatus },
        });
    }
}

//exporting functions
exports.addProduct = addProduct;
exports.removeProduct = removeProduct;
exports.cartProducts = cartProducts;
