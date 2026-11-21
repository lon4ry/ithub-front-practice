export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

const jsonBody = (data) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

export const getCategories = () => request('/categories/all');
export const getCategory = (id) => request(`/categories/${id}`);
export const getProducts = () => request('/products/all');
export const getProduct = (id) => request(`/products/${id}`);
export const sendOrder = (order) => request('/order/send', jsonBody(order));
export const sendSaleRequest = (data) => request('/sale/send', jsonBody(data));

export const imageUrl = (path) => (path ? `${API_URL}${path}` : '');
