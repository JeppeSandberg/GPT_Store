import axios from "axios";

const BASE_URL = "http://localhost:3001";

export function getCategories() {
  return axios.get(`${BASE_URL}/categories`);
}

export function getProducts() {
  return axios.get(`${BASE_URL}/products`);
}

export function getUser(userId) {
  return axios.get(`${BASE_URL}/users/${userId}`);
}

// ... add more functions as needed ...
