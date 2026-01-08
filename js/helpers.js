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
export const increaseQuantity = (arrayElements, elementId) => {
  return arrayElements.map((element) => {
    if (element.id !== elementId) return element;
    const newQuantity = element.quantity + 1;
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
const applyPromotionInElement = (element, quantity) => {
  return element.offer && quantity >= element.offer.number
    ? element.price * (1 - element.offer.percent / 100)
    : element.price;
};
