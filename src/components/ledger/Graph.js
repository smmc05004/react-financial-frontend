import React from 'react';
import { Bar } from 'react-chartjs-2';

const Graph = ({ analysis }) => {
  if (analysis.expense) {
    console.log('Graph 컴포넌트', analysis);
    console.log('지출: ', analysis.expense);
    console.log('라벨: ', analysis.expense.label);
  }

  // console.log('길이: ', analysis.expense.label.length);
  return (
    <>
      <div>
        {analysis.expense && analysis.expense.label.length > 0 ? (
          <Bar
            data={{
              labels: analysis.expense.label,
              datasets: [
                {
                  label: 'expense',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 1,
                  data: analysis.expense.data,
                },
              ],
            }}
            height={300}
            width={300}
            options={{
              maintainAspectRatio: false,
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
        ) : (
          <div>데이터 없음</div>
        )}
      </div>

      <div>
        {analysis.income && analysis.income.label.length > 0 ? (
          <Bar
            data={{
              labels: analysis.income.label,
              datasets: [
                {
                  label: 'income',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 1,
                  data: analysis.income.data,
                },
              ],
            }}
            height={300}
            width={300}
            options={{
              maintainAspectRatio: false,
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
        ) : (
          <div>데이터 없음</div>
        )}
      </div>
    </>
  );
};

export default Graph;
