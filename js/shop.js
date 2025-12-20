import { products } from "./products.js";
import { addProduct, increaseQuantity } from "./helpers.js";

const addButtons = document.querySelectorAll(".add-to-cart");
const clearCartButton = document.getElementById("clean-cart");

addButtons.forEach((element) => {
  element.addEventListener("click", (event) => {
    const id = event.target.dataset.productId;
    buy(parseInt(id));
    calculateTotal();
    console.log({ cart, total }, "Estat actual del cart i el total a pagar");
  });
});

clearCartButton.addEventListener("click", () => {
  cleanCart();
  calculateTotal();
  console.log({ cart, total }, "Estat actual del cart i el total a pagar");
});

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
};

// Exercise 3
const calculateTotal = () => {
  !cart.length
    ? (total = 0)
    : (total = cart.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.totalWithoutDiscount,
        0
      ));
};

// Exercise 4
const applyPromotionsCart = () => {
  // Apply promotions to each item in the array "cart"
};

// Exercise 5
const printCart = () => {
  // Fill the shopping cart modal manipulating the shopping cart dom
};

// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {};

const open_modal = () => {
  printCart();
};
