/* eslint-disable no-unused-expressions */
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Graph = ({ expense, income }) => {
  console.log('Graph 컴포넌트: ', expense, income);

  return (
    <>
      <div>
        {expense && (
          <Bar
            data={{
              labels: expense.label,
              datasets: [
                {
                  label: 'expense',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: expense.data,
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: `카테고리별 총 소비량`,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        )}
      </div>

      <div>
        {income && (
          <Bar
            data={{
              labels: income.label,
              datasets: [
                {
                  label: 'income',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: income.data,
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: `카테고리별 총 소득`,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default Graph;
