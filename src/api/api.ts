import axios from 'axios';

// Interfaces for our Data
export interface ShortenResponse {
    message: string;
  shortUrl: string;
  originalUrl: string;
}

export interface ApiError {
  error: string;
}

const api = axios.create({
  baseURL: 'https://url-rhh7.onrender.com/url',
  headers: { 'Content-Type': 'application/json' }
});

export default api;