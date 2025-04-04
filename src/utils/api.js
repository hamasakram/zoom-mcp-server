import axios from 'axios';
    import { getAccessToken } from './auth.js';

    const BASE_URL = 'https://api.zoom.us/v2';

    // Create an axios instance for Zoom API
    export const zoomApi = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor to add authorization header
    zoomApi.interceptors.request.use(async (config) => {
      const token = await getAccessToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Response interceptor to handle errors
    zoomApi.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );

    // Helper function to handle API responses
    export const handleApiResponse = (response) => {
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(response.data, null, 2)
        }]
      };
    };

    // Helper function to handle API errors
    export const handleApiError = (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      return {
        content: [{ 
          type: "text", 
          text: `Error: ${errorMessage}`
        }],
        isError: true
      };
    };
