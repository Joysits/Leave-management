/**
 * Handles backend logic for API calls, authentication, and data fetching.
 * This file serves as a central point for all API interactions, ensuring
 * that the frontend can easily communicate with the backend services.
 *
 * Functions
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/'; // Adjust as needed

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    

  },
});

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login/', { email, password });
    return response.data; // Return user data and token
  } catch (error) {
    throw new Error('Login failed. Please check your credentials', { cause: error.message });
  }
};

export const signup = async (userData) => {
  try {
    const response = await apiClient.post('/auth/signup/', userData);
    return response.data; // Return created user data
  } catch (error) {
    throw new Error('Signup failed. Please try again.', { cause: error.message });
  }
};