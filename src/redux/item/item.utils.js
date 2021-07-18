export const getPage = (items, page, perPage) => items.slice(page * perPage,
  (page * perPage) + perPage);

export const getTotal = (products, quantities) => {
  const sortedProducts = products.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } if (a.id > b.id) {
      return 1;
    }
    return 0;
  });

  const sortedQuantities = quantities.sort((a, b) => {
    if (a.product_id < b.product_id) {
      return -1;
    } if (a.product_id > b.product_id) {
      return 1;
    }
    return 0;
  });

  let total = 0;
  for (let i = 0; i < sortedProducts.length; i += 1) {
    total += sortedProducts[i].price * sortedQuantities[i].quantity;
  }

  return total;
};

export const ivancito = 'ivancito';
