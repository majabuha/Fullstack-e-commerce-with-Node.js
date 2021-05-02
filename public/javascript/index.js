const searchBtn = document.getElementById('search-btn');
const productList = document.getElementById('result');
let myCart = document.getElementById('my-cart');
let cartItemCount = 0;

searchBtn.addEventListener('click', getProductList);


async function getProductList() {
  const response = await fetch('http://127.0.0.1:8000/api/products');
  const data = await response.json();
  let html = '';
  data.forEach((products) => {
    html += `
          <div class = "item" data-id = "${products.product}">
          <div class = "product-img">
            <img src = "${products.image}" alt = "product-image">
          </div>
          <div class = "name">
              <h3>${products.product}</h3>
              <p>${products.price}kr</p>
              <button class="details-btn add-button" type="submit">Add to cart</button>

            </div>
          </div>
`;
  });
  
  productList.innerHTML = html;

  const buttons = document.querySelectorAll('.add-button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
      event.preventDefault();
      fetch(`http://127.0.0.1:8000/api/cart/${data[i].id}`, { method: 'POST' })
        .then(
          function(response){
            if (response.status == 409) {
              alert(`Product is already in the cart`);
              return;
            }
            cartItemCount++;
            myCart.innerHTML = cartItemCount;
          }
        )
    });
  }
}

var searchButton = document.getElementById('search-btn')
searchButton.addEventListener('click', hideshow, false);

function hideshow() {
  document.getElementById('search-box').style.display = 'block';
  this.style.display = 'none'
}

async function getProductCountInCart(){
  const response = await fetch('http://127.0.0.1:8000/api/cart/');
  const data = await response.json();

  cartItemCount = data.data.cartStatus.length;
  myCart.innerHTML = cartItemCount;
}

getProductCountInCart();
