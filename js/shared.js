export const printCountProduct = (elementToPrint, cartArray) => {
  if (!elementToPrint || !Array.isArray(cartArray)) return;
  const elementsNumber = cartArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );
  elementToPrint.textContent = elementsNumber;
};
