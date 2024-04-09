import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export function getCategories() {
  return axios.get(`${BASE_URL}/categories`)
    .then(response => {
      return response.data;
    });
}

export function getProducts(categoryId) {
  return axios.get(`${BASE_URL}/products${categoryId ? `?categoryId=${categoryId}` : ''}`)
    .then(async response => {
      const products = response.data;
      for (let product of products) {
        const ratings = await getRatings(product.id);
        if (ratings.length > 0) {
          const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
          product.averageRating = total / ratings.length;
        } else {
          product.averageRating = 0;
        }
      }
      return products;
    })
    .catch(error => console.error('Error:', error));
}

export function getProduct(productId) {
  return axios.get(`${BASE_URL}/products/${productId}`);
}

export function getUser(userId) {
  return axios.get(`${BASE_URL}/users/${userId}`);
}

export function registerUser(username, password, isAdmin = false) {
  return axios.post(`${BASE_URL}/register`, { username, password, isAdmin });
}

export function loginUser(username, password) {
  return axios.post(`${BASE_URL}/login`, { username, password });
}

export function createOrder(userId, username, items, total) {
  const date = new Date().toISOString();
  return axios.post(`${BASE_URL}/orders`, { userId, username, items, total, date });
}

export function getOrders() {
  return axios.get(`${BASE_URL}/orders`)
    .then(response => response.data)
    .catch(error => console.error('Error:', error));
}

export function addProduct(data) {
  return axios.post(`${BASE_URL}/products`, data)
    .then(response => response.data)
    .catch(error => console.error('Error:', error));
}

export function removeProduct(id) {
  return axios.delete(`${BASE_URL}/products/${id}`)
    .catch(error => console.error('Error:', error));
}

export function updateProduct(id, data) {
  return axios.put(`${BASE_URL}/products/${id}`, data)
    .then(response => ({ ...response.data, id })) // Ensure that the updated product has the same id
    .catch(error => console.error('Error:', error));
}

export function getRatings(productId) {
  return axios.get(`${BASE_URL}/ratings/${productId}`)
    .then(response => {
      console.log('getRatings response:', response);
      return response.data;
    })
    .catch(error => console.error('Error:', error));
}

export function addRating(productId, rating, userId) {
  return axios.post(`${BASE_URL}/ratings`, { productId, rating, userId })
    .then(response => response.data)
    .catch(error => console.error('Error:', error));
}

// ... rest of the code ...

// ... add more functions as needed ...