// frontend/src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const register = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const getBalance = () =>
  api.get('/wallet/balance');

export const getTransactions = () =>
  api.get('/wallet/transactions'); // Updated to match the backend route

export const fundWallet = (data: { amount: number }) =>
  api.post('/wallet/fund', data);

export const transfer = (data: { amount: number; receiverId: number }) =>
  api.post('/wallet/transfer', data);