import { products } from "./products.js";
import {
  addProduct,
  updateProduct,
  removeElement,
  countProducts,
} from "./helpers.js";

const addButtons = document.querySelectorAll(".add-to-cart");
const clearCartButton = document.querySelector("#clean-cart");
const openModalButton = document.querySelector(".cart-button");
const countProductElement = document.querySelector("#count_product");
addButtons.forEach((element) => {
  element.addEventListener("click", (event) => {
    const id = event.target.dataset.productId;
    buy(parseInt(id));
    printCountProduct();
  });
});

clearCartButton.addEventListener("click", () => {
  cleanCart();
  printCart();
});
const cartList = document.querySelector("#cart_list");
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("decrease-quantity")) {
    const productId = event.target.dataset.productId;
    decreaseQuantity(productId);
    printCountProduct();
  }
});

openModalButton.addEventListener("click", () => open_modal());

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
    ? (cart = updateProduct(cart, id, "increase"))
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
  cartList.replaceChildren();
  const totalElement = document.querySelector("#total_price");
  cart.forEach((element) => {
    cartList.insertAdjacentHTML(
      "beforeend",
      `<tr>
            <th scope="row">${element.name}</th>
            <td>$${element.price}</td>
            <td>${element.quantity}<button class="decrease-quantity" data-product-id=${element.id}>-</button></td>
            <td>$${element.totalWithDiscount}</td>
        </tr>`
    );
  });

  calculateTotal();
  totalElement.textContent = total;
};

// ** Nivell II **

// Exercise 7
export const decreaseQuantity = (productId) => {
  const completeElement = cart.find((element) => element.id == productId);
  completeElement && completeElement.quantity > 1
    ? (cart = updateProduct(cart, parseInt(productId), "decrease"))
    : (cart = removeElement(cart, productId));
  printCart();
};

const open_modal = () => {
  printCart();
};

const printCountProduct = () => {
  countProductElement.textContent = countProducts(cart);
};
