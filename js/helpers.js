export const addProduct = (arrayElements, producToAdd) => {
  return [...arrayElements, { ...producToAdd, quantity: 1 }];
};
export const increaseQuantity = (arrayElements, elementId) => {
  return arrayElements.map((element) => {
    if (element.id === elementId) {
      return { ...element, quantity: ++element.quantity };
    } else {
      return { ...element };
    }
  });
};
