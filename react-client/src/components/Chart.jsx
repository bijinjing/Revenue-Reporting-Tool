import React from "react";
import {Doughnut} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';

function Chart({newData,title,name,type}){
  let chartData;

  if(type === 'chart' && title.type === "Customer"){
    chartData = {
      labels: newData.customers,
      datasets: [
        {
          label: `${name}`,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: newData.amounts
        }
      ]
    };
    return <HorizontalBar data={chartData} />
  } else if(type === 'pie'){
    let amounts = newData.map((item) => {
      return item['ABS(sum(General_ledger.amount))']
    })
    chartData = {
      labels: [
        'Accounts Payable',
        'Cash',
        'Revenue'
      ],
      datasets: [{
        data: amounts,
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    };
    return <Doughnut data={chartData} />
  } else if(type === 'chart' && title.type === "Month"){
    chartData = {
      labels: newData.months,
      datasets: [
        {
          label: `${name}`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: newData.amounts
        }
      ]
    };
    return <Line data={chartData} />
  }
}


export default Chart