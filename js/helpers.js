export const addProduct = (arrayElements, producToAdd) => {
  return [
    ...arrayElements,
    {
      ...producToAdd,
      quantity: 1,
      totalWithDiscount: producToAdd.price,
    },
  ];
};
export const updateProduct = (arrayElements, elementId, modifier) => {
  if (modifier !== "increase" && modifier !== "decrease") {
    throw new Error(
      `Invalid modifier: ${modifier} is not allowed. The accepeted values are "increase" and "decrease"`
    );
  }
  return arrayElements.map((element) => {
    if (element.id !== elementId) return element;

    const newQuantity =
      modifier === "increase" ? element.quantity + 1 : element.quantity - 1;

    if (newQuantity < 1) {
      throw new Error("The quantity can't be less than 1 in this function");
    }

    const discountedElementPrice = applyPromotionInElement(
      element,
      newQuantity
    );

    return {
      ...element,
      quantity: newQuantity,
      totalWithDiscount:
        Math.round(discountedElementPrice * newQuantity * 100) / 100,
    };
  });
};

export const countProducts = (arrayElements) => {
  return arrayElements.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );
};

const applyPromotionInElement = (element, quantity) => {
  return element.offer && quantity >= element.offer.number
    ? element.price * (1 - element.offer.percent / 100)
    : element.price;
};

export const removeElement = (arrayElements, productId) => {
  return arrayElements.filter((element) => element.id != productId);
};
