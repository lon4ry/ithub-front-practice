export const defaultFilters = {
  priceFrom: '',
  priceTo: '',
  onlyDiscounted: false,
  sort: 'default',
};

export const getPrice = (product) => product.discont_price ?? product.price;

export const getDiscountPercent = (product) =>
  product.discont_price ? Math.round((1 - product.discont_price / product.price) * 100) : 0;

export const formatPrice = (value) =>
  `$${Number(value)
    .toFixed(2)
    .replace(/\.00$/, '')}`;

export const filterProducts = (products, { priceFrom, priceTo, onlyDiscounted, sort }) => {
  const from = priceFrom === '' ? 0 : Number(priceFrom);
  const to = priceTo === '' ? Infinity : Number(priceTo);

  const result = products.filter((product) => {
    const price = getPrice(product);
    return price >= from && price <= to && (!onlyDiscounted || Boolean(product.discont_price));
  });

  switch (sort) {
    case 'price-asc':
      return result.sort((a, b) => getPrice(a) - getPrice(b));
    case 'price-desc':
      return result.sort((a, b) => getPrice(b) - getPrice(a));
    case 'title':
      return result.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return result;
  }
};
