import { products } from "./products.js";
import { addProduct, updateProduct, removeElement } from "./cart.js";
import { printCountProduct } from "./shared.js";

// Selección de elementos del dom
const addButtons = document.querySelectorAll(".add-to-cart");
const clearCartButton = document.querySelector("#clean-cart");
const openModalButton = document.querySelector(".cart-button");
const countProductElement = document.querySelector("#count_product");
const cartList = document.querySelector("#cart_list");
const totalElement = document.querySelector("#total_price");

// Estado
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

//Funciones de lógica de negocio
// Exercise 1
const buy = (id) => {
  const productToAdd = products.find((product) => product.id === id);
  if (!cart.length) {
    cart = addProduct(cart, productToAdd);
    return;
  }
  const productInCart = cart.some((element) => element.id === id);

  cart = productInCart
    ? updateProduct(cart, id, "increase")
    : addProduct(cart, productToAdd);
};

// Exercise 2
const emptyCart = () => {
  cart = [];
  total = 0;
};

// Exercise 3
const calculateTotalPrice = () => {
  total = cart.reduce(
    (accumulator, currentItem) => accumulator + currentItem.totalWithDiscount,
    0
  );
};

// Exercise 7
const decreaseQuantity = (productId) => {
  const completeElement = cart.find((element) => element.id == productId);

  cart =
    completeElement && completeElement.quantity > 1
      ? updateProduct(cart, parseInt(productId), "decrease")
      : removeElement(cart, productId);
  printCart();
};

// Funciones de renderizado

// Exercise 5
const printCart = () => {
  cartList.replaceChildren();

  cart.forEach((element) => {
    cartList.insertAdjacentHTML(
      "beforeend",
      `<tr>
            <th scope="row">${element.name}</th>
            <td>$${element.price}</td>
            <td>${element.quantity}<button class="decrease-quantity" data-product-id=${element.id} aria-label="decrease-quantity">-</button></td>
            <td>$${element.totalWithDiscount}</td>
        </tr>`
    );
  });

  calculateTotalPrice();
  totalElement.textContent = total;
};

const openModal = () => {
  printCart();
};

// Event handlers

const addProductToCart = (event) => {
  const id = event.target.dataset.productId;
  buy(parseInt(id));
  localStorage.setItem("cart", JSON.stringify(cart));
  printCountProduct(countProductElement, cart);
};

const cleanCart = () => {
  emptyCart();
  localStorage.removeItem("cart");
  printCart(countProductElement, cart);
  printCountProduct(countProductElement, cart);
};

const decreaseProduct = (event) => {
  if (event.target.classList.contains("decrease-quantity")) {
    const productId = event.target.dataset.productId;
    decreaseQuantity(productId);
    printCountProduct(countProductElement, cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Inicialización

addButtons.forEach((element) => {
  element.addEventListener("click", addProductToCart);
});

clearCartButton.addEventListener("click", cleanCart);

cartList.addEventListener("click", decreaseProduct);

openModalButton.addEventListener("click", openModal);

printCountProduct(countProductElement, cart);
