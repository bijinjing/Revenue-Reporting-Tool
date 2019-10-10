import React from "react";
import {Doughnut} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';

function Chart({newData,date,name,type}){
  let chartData;
  console.log('data',newData, 'type', type, '')

  if(type === 'chart'){
    chartData = {
      labels: newData.customers,
      datasets: [
        {
          label: `${name} by customers for ${date}`,
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
  } else {
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

  }
}


export default Chart