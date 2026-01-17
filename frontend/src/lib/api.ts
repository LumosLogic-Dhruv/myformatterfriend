// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://myformatterfriend.onrender.com/api',
  ENDPOINTS: {
    HEALTH: '/health',
    MODEL_STATUS: '/document/model-status',
    PROCESS: '/document/process',
    DOWNLOAD: '/download'
  }
};

// API utility functions
export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  console.log('API Call:', url);
  
  const response = await fetch(url, {
    ...options,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response;
};