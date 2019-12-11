import client from './client';

export const register = ({ userId, userName, password }) => {
  console.log('client 요청');
  console.log('서버로 넘기는 파라미터: ', userId, userName, password);
  return client.post('/api/auth/register', { userId, userName, password });
};
