import { printCountProduct } from "./shared.js";

//Selección de elementos del dom
const countProductElement = document.querySelector("#count_product");

const submitButton = document.querySelector("#validate-button");
const fName = document.querySelector("#fName");
const fEmail = document.querySelector("#fEmail");
const fAddress = document.querySelector("#fAddress");
const fLastN = document.querySelector("#fLastN");
const fPassword = document.querySelector("#fPassword");
const fPhone = document.querySelector("#fPhone");

const errorName = document.querySelector("#errorName");
const errorEmail = document.querySelector("#errorEmail");
const errorAddress = document.querySelector("#errorAddress");
const errorLastN = document.querySelector("#errorLastN");
const errorPassword = document.querySelector("#errorPassword");
const errorPhone = document.querySelector("#errorPhone");

// Estado
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función con lógica de negocio

const validations = [
  { input: fName, errorData: errorName, regex: /^[A-Za-z]{3,}$/ },
  {
    input: fEmail,
    errorData: errorEmail,
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  {
    input: fAddress,
    errorData: errorAddress,
    regex: /^[A-Za-z0-9\s,.-]{3,}$/,
  },
  { input: fLastN, errorData: errorLastN, regex: /^[A-Za-z]{3,}$/ },
  {
    input: fPassword,
    errorData: errorPassword,
    regex: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{3,}$/,
  },
  { input: fPhone, errorData: errorPhone, regex: /^[0-9]{3,}$/ },
];

// Event handler
const validate = (event) => {
  event.preventDefault();
  let error = 0;

  validations.forEach((element) => {
    if (!element.regex.test(element.input.value.trim())) {
      error++;
      element.input.style.borderColor = "red";
      element.errorData.style.display = "block";
    } else {
      element.input.style.borderColor = "initial";
      element.errorData.style.display = "none";
    }
  });

  if (error > 0) {
    return;
  }
  alert("Form submitted successfully");
};

//Iniciación
submitButton.addEventListener("click", validate);

printCountProduct(countProductElement, cart);
