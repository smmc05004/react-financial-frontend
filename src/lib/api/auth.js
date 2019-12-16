import client from './client';

export const register = ({ userId, userName, password }) =>
  client.post('/api/auth/register', { userId, userName, password });

export const login = ({ userId, password }) =>
  client.post('/api/auth/login', { userId, password });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.get('/api/auth/logout');
