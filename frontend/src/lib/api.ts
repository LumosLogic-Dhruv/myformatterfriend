// API Configuration
const getBaseUrl = (): string => {
  // Check for environment variable first
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Default to production backend
  if (import.meta.env.PROD) {
    return 'https://myformatterfriend.onrender.com/api';
  }

  // In development, try local backend first
  return 'http://localhost:5000/api';
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  ENDPOINTS: {
    HEALTH: '/health',
    MODEL_STATUS: '/document/model-status',
    PROCESS: '/document/process',
    DOWNLOAD: '/download',
    TEMPLATES: '/document/templates',
    TEMPLATE_BY_ID: '/document/templates'
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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response;
};

// Fetch with retry for backend wake-up
export const fetchWithRetry = async (url: string, options?: RequestInit, retries = 3): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        mode: 'cors',
      });
      if (response.ok) return response;

      // If server is waking up (502/503), wait and retry
      if (response.status === 502 || response.status === 503) {
        console.log(`Server waking up, retrying in ${(i + 1) * 2} seconds...`);
        await new Promise(resolve => setTimeout(resolve, (i + 1) * 2000));
        continue;
      }

      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Request failed, retrying in ${(i + 1) * 2} seconds...`);
      await new Promise(resolve => setTimeout(resolve, (i + 1) * 2000));
    }
  }
  throw new Error('Max retries exceeded');
};

// Health check function
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetchWithRetry(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, 2);
    return response.ok;
  } catch {
    return false;
  }
};
