import client from './client';

export const addLedger = ({ type, category, title, place, amount, user }) => {
  console.log();
  return client.post('/api/ledger/add', {
    type,
    category,
    title,
    place,
    amount,
    user,
  });
};
