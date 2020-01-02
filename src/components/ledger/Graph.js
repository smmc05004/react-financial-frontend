import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

const Graph = ({ analysis }) => {
  if (analysis.expense) {
    console.log('Graph 컴포넌트', analysis);
    console.log('지출: ', analysis.expense);
    console.log('라벨: ', analysis.expense.label);
  }

  // console.log('길이: ', analysis.expense.label.length);
  return (
    <>
      <div className="expenseChart">
        <div className="chartArea">
          <div className="expenseBar">
            {analysis.expense && analysis.expense.label.length > 0 ? (
              <Bar
                data={{
                  labels: analysis.expense.label,
                  datasets: [
                    {
                      label: 'expense',
                      backgroundColor: 'rgba(75,192,192,0.5)',
                      borderColor: 'rgba(0,0,0,1)',
                      borderWidth: 1,
                      borderSkipped: 'bottom',
                      data: analysis.expense.data,
                    },
                  ],
                }}
                options={{
                  animation: {
                    duration: 2000,
                  },
                  title: {
                    display: true,
                    text: `카테고리별 총 소비량`,
                    fontSize: 20,
                    fontStyle: 'bold',
                    fontColor: 'rgb(0, 0, 0)',
                  },
                  legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    fullWidth: 'true',
                    reverse: 'false',
                    labels: {
                      boxWidth: 50,
                      fontColor: 'rgb(0, 0, 0)',
                      fontSize: 15,
                      usePointStyle: false,
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: '종류',
                          fontColor: 'rgb(0, 0, 0)',
                          fontSize: 13,
                          fontStyle: 'bold',
                          padding: 2,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: '금액',
                          fontColor: 'rgb(0, 0, 0)',
                          fontSize: 13,
                          fontStyle: 'bold',
                          padding: 2,
                        },
                      },
                    ],
                  },
                }}
              />
            ) : (
              <div>데이터 없음</div>
            )}
          </div>
          <div className="expenseDonut">
            {analysis.expense && analysis.expense.label.length > 0 ? (
              <Doughnut
                data={{
                  labels: analysis.expense.label,
                  datasets: [
                    {
                      label: 'expense',
                      // backgroundColor: 'rgba(75,192,192,1)',
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(153, 102, 255, 0.4)',
                        'rgba(255, 159, 64, 0.4)',
                      ],
                      borderColor: 'rgba(0,0,0,1)',
                      borderWidth: 1,
                      borderSkipped: 'bottom',
                      data: analysis.expense.data,
                    },
                  ],
                }}
                options={{
                  animation: {
                    duration: 2000,
                  },
                  title: {
                    display: true,
                    text: `카테고리별 총 소비율`,
                    fontSize: 20,
                    fontStyle: 'bold',
                    fontColor: 'rgb(0, 0, 0)',
                  },
                  legend: {
                    display: true,
                    position: 'right',
                    align: 'start',
                    fullWidth: 'true',
                    reverse: 'false',
                    labels: {
                      boxWidth: 50,
                      fontColor: 'rgb(0, 0, 0)',
                      fontSize: 15,
                      usePointStyle: false,
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: '종류',
                          fontColor: 'rgb(0, 0, 0)',
                          fontSize: 13,
                          fontStyle: 'bold',
                          padding: 2,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: '금액',
                          fontColor: 'rgb(0, 0, 0)',
                          fontSize: 13,
                          fontStyle: 'bold',
                          padding: 2,
                        },
                      },
                    ],
                  },
                }}
              />
            ) : (
              <div>데이터 없음</div>
            )}
          </div>
        </div>
        <div className="tableArea">소비 테이블</div>
      </div>

      <div className="incomeChart">
        <div className="chartArea">
          <div className="incomeBar">
            {analysis.income && analysis.income.label.length > 0 ? (
              <Bar
                data={{
                  labels: analysis.income.label,
                  datasets: [
                    {
                      label: 'expense',
                      backgroundColor: 'rgba(75,192,192,0.5)',
                      borderColor: 'rgba(0,0,0,1)',
                      borderWidth: 1,
                      borderSkipped: 'bottom',
                      data: analysis.income.data,
                    },
                  ],
                }}
                options={{
                  animation: {
                    duration: 2000,
                  },
                  title: {
                    display: true,
                    text: `카테고리별 총 소득양`,
                    fontSize: 20,
                    fontStyle: 'bold',
                    fontColor: 'rgb(0, 0, 0)',
                  },
                  legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    fullWidth: 'true',
                    reverse: 'false',
                    labels: {
                      boxWidth: 50,
                      fontColor: 'rgb(0, 0, 0)',
                      fontSize: 15,
                      usePointStyle: false,
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: '종류',
                          fontColor: 'rgb(0, 0, 0)',
                          fontSize: 13,
                          fontStyle: 'bold',
                          padding: 2,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: '금액',
                          fontColor: 'rgb(0, 0, 0)',
                          fontSize: 13,
                          fontStyle: 'bold',
                          padding: 2,
                        },
                      },
                    ],
                  },
                }}
              />
            ) : (
              <div>데이터 없음</div>
            )}
          </div>
          <div className="incomeDonut">
            {analysis.income && analysis.income.label.length > 0 ? (
              <Doughnut
                data={{
                  labels: analysis.income.label,
                  datasets: [
                    {
                      label: 'income',
                      // backgroundColor: 'rgba(75,192,192,1)',
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(153, 102, 255, 0.4)',
                        'rgba(255, 159, 64, 0.4)',
                      ],
                      borderColor: 'rgba(0,0,0,1)',
                      borderWidth: 1,
                      borderSkipped: 'bottom',
                      data: analysis.income.data,
                    },
                  ],
                }}
                options={{
                  animation: {
                    duration: 2000,
                  },
                  title: {
                    display: true,
                    text: `카테고리별 총 소득율`,
                    fontSize: 20,
                    fontStyle: 'bold',
                    fontColor: 'rgb(0, 0, 0)',
                  },
                  legend: {
                    display: true,
                    position: 'right',
                    align: 'start',
                    fullWidth: 'true',
                    reverse: 'false',
                    labels: {
                      boxWidth: 50,
                      fontColor: 'rgb(0, 0, 0)',
                      fontSize: 15,
                      usePointStyle: false,
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: '종류',
                          fontColor: 'rgb(0, 0, 0)',
                          fontSize: 13,
                          fontStyle: 'bold',
                          padding: 2,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: '금액',
                          fontColor: 'rgb(0, 0, 0)',
                          fontSize: 13,
                          fontStyle: 'bold',
                          padding: 2,
                        },
                      },
                    ],
                  },
                }}
              />
            ) : (
              <div>데이터 없음</div>
            )}
          </div>
        </div>
        <div className="tableArea">소득 테이블</div>
      </div>
    </>
  );
};

export default Graph;
