const API_BASE = 'http://localhost:5001/api';

const getToken = () => localStorage.getItem('hungrybeer_token');

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('hungrybeer_token', token);
  } else {
    localStorage.removeItem('hungrybeer_token');
  }
};

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`[API Network Error on ${endpoint}]:`, error.message);
    return { success: false, message: error.message };
  }
};

export const api = {
  // Auth
  auth: {
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    getMe: () => request('/auth/me'),
    updateProfile: (profile) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(profile) }),
  },

  // Buyer
  buyer: {
    getRestaurants: (params = '') => request(`/buyer/restaurants?${params}`),
    getRestaurantById: (id) => request(`/buyer/restaurants/${id}`),
    createOrder: (orderData) => request('/buyer/orders', { method: 'POST', body: JSON.stringify(orderData) }),
    getMyOrders: () => request('/buyer/orders'),
    getOrderById: (id) => request(`/buyer/orders/${id}`),
    cancelOrder: (id) => request(`/buyer/orders/${id}/cancel`, { method: 'PUT' }),
    bookTable: (bookingData) => request('/buyer/tables', { method: 'POST', body: JSON.stringify(bookingData) }),
    getMyBookings: () => request('/buyer/tables'),
    addReview: (reviewData) => request('/buyer/reviews', { method: 'POST', body: JSON.stringify(reviewData) }),
  },

  // Seller
  seller: {
    getRestaurant: () => request('/seller/restaurant'),
    updateRestaurant: (data) => request('/seller/restaurant', { method: 'POST', body: JSON.stringify(data) }),
    toggleOpenStatus: () => request('/seller/restaurant/toggle-status', { method: 'PUT' }),
    getMenu: () => request('/seller/menu'),
    addMenuItem: (itemData) => request('/seller/menu', { method: 'POST', body: JSON.stringify(itemData) }),
    updateMenuItem: (id, itemData) => request(`/seller/menu/${id}`, { method: 'PUT', body: JSON.stringify(itemData) }),
    deleteMenuItem: (id) => request(`/seller/menu/${id}`, { method: 'DELETE' }),
    toggleItemStock: (id) => request(`/seller/menu/${id}/toggle-stock`, { method: 'PUT' }),
    getOrders: (status = '') => request(`/seller/orders?status=${status}`),
    updateOrderStatus: (id, status) => request(`/seller/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    getTableBookings: () => request('/seller/tables'),
    updateTableStatus: (id, status) => request(`/seller/tables/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    getAnalytics: () => request('/seller/analytics'),
  }
};
