import client from './client';
import qs from 'qs';

export const addLedger = ({ type, category, title, place, amount, user }) =>
  client.post('/api/ledger/add', {
    type,
    category,
    title,
    place,
    amount,
    user,
  });

export const listLedgers = ({ pageNum, userId }) => {
  const queryString = qs.stringify({
    pageNum,
    userId,
  });
  console.log('queryString: ', queryString);
  return client.get(`/api/ledger/lists?${queryString}`);
};
