const cartList = document.getElementById('items');
const cartSum = document.getElementById('totalSum');

async function getCartList() {

  let sum = 0;
  let html = '';

  try {
    const response = await fetch('http://127.0.0.1:8000/api/cart/');
    const data = await response.json();

    const cartItems = data.data.cartStatus;
    cartItems.forEach((cart) => {
      sum += parseInt(cart.price);
      html += `
          <div class = "item" data-id = "${cart.product}" id="cartItem_${cart.id}">
            <div class="buttons">
              <button class="delete-btn" id="delete-button">X</button>
            </div>
            <div class="image"><img src="${cart.image}" alt="product-image" width=90" height="80"/></div>
            <div class="description"><span>${cart.product}</span></div>
            <div class="quantity">
              <input type="text" name="name" value="1">
            </div>
            <div class="total-price">${cart.price}kr</div>
          </div>
`;
    });

    cartList.innerHTML = html;
    cartSum.textContent = sum;

    const delItem = document.querySelectorAll('#delete-button');
    for (let i = 0; i < delItem.length; i++) {
      delItem[i].addEventListener('click', () => {
        fetch(`http://127.0.0.1:8000/api/cart/${cartItems[i].id}`, { method: 'DELETE' })
          .then(
            function (response) {
              if (response.status == 200) {
                document.getElementById('cartItem_' + cartItems[i].id).remove();
                return;
              }
            })
        getCartList();
      });
    }

  } catch (error) {
    cartList.innerHTML = ("No products to display!");
    cartSum.textContent = sum;
  }
}

getCartList();
