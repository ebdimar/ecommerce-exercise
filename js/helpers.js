export const addProduct = (arrayElements, producToAdd) => {
  return [
    ...arrayElements,
    {
      ...producToAdd,
      quantity: 1,
      totalWithoutDiscount: producToAdd.price,
    },
  ];
};
export const increaseQuantity = (arrayElements, elementId) => {
  return arrayElements.map((element) => {
    if (element.id === elementId) {
      return {
        ...element,
        quantity: ++element.quantity,
        totalWithoutDiscount: element.price * element.quantity,
      };
    } else {
      return { ...element };
    }
  });
};

export const sumPrice = (element) => {
  return element.price * element.quantity;
};
