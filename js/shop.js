import { products } from "./products.js";
import { addProduct, increaseQuantity } from "./helpers.js";

const addButtons = document.querySelectorAll(".add-to-cart");
const clearCartButton = document.querySelector("#clean-cart");
const openModalButton = document.querySelector(".cart-button");

addButtons.forEach((element) => {
  element.addEventListener("click", (event) => {
    const id = event.target.dataset.productId;
    buy(parseInt(id));
  });
});

clearCartButton.addEventListener("click", () => {
  cleanCart();
  printCart();
});

openModalButton.addEventListener("click", open_modal);

let cart = [];

let total = 0;

const buy = (id) => {
  const productToAdd = products.find((product) => product.id === id);
  if (!cart.length) {
    cart = addProduct(cart, productToAdd);
    return;
  }
  const productInCart = cart.some((element) => element.id === id);
  productInCart
    ? (cart = increaseQuantity(cart, id))
    : (cart = addProduct(cart, productToAdd));
};

// Exercise 2
const cleanCart = () => {
  cart = [];
  total = 0;
};

// Exercise 3
const calculateTotal = () => {
  total = cart.reduce(
    (accumulator, currentItem) => accumulator + currentItem.totalWithDiscount,
    0
  );
};

// Exercise 4
//Moved to helpers function applyPromotionInElement

// Exercise 5
const printCart = () => {
  const cartList = document.querySelector("#cart_list");
  cartList.replaceChildren();
  const totalElement = document.querySelector("#total_price");
  cart.forEach((element) => {
    cartList.insertAdjacentHTML(
      "beforeend",
      `<tr>
            <th scope="row">${element.name}</th>
            <td>$${element.price}</td>
            <td>${element.quantity}</td>
            <td>$${element.totalWithDiscount}</td>
        </tr>`
    );
  });
  calculateTotal();
  totalElement.textContent = total;
};

// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {};

function open_modal() {
  printCart();
}
