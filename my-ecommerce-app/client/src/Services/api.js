import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export function getCategories() {
  return axios.get(`${BASE_URL}/categories`);
}

export function getProducts(categoryId) {
  const url = categoryId ? `${BASE_URL}/categories/${categoryId}` : `${BASE_URL}/products`;
  return axios.get(url);
}

export function getProduct(productId) {
  return axios.get(`${BASE_URL}/products/${productId}`);
}

export function getUser(userId) {
  return axios.get(`${BASE_URL}/users/${userId}`);
}

export function registerUser(username, password) {
  return axios.post(`${BASE_URL}/register`, { username, password });
}

export function loginUser(username, password) {
  return axios.post(`${BASE_URL}/login`, { username, password });
}

export function createOrder(userId, username, items, total) {
  const date = new Date().toISOString();
  return axios.post(`${BASE_URL}/orders`, { userId, username, items, total, date });
}

// ... add more functions as needed ...