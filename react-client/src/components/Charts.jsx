import React from "react";
import Chart from "./Chart.jsx"

function Charts({data, year, month, customer}){
  let title = {};
  let newData = {
    'revenue':{
      months:[],
      customers:[],
      amounts:[]
    },
    'cash':{
      months:[],
      customers:[],
      amounts:[]
    },
    'accounts payable':{
      months:[],
      customers:[],
      amounts:[]
    }
  }

  data.forEach((item) => {
    if(customer === "-" || customer === ""){
      newData[item.name].customers.push(item.customerName);
      if(newData[item.name].months){
        delete newData[item.name].months
      }
    };
    if(month === "-" || month === ""){
      newData[item.name].months.push(item.entryDate);
      if(newData[item.name].customers){
        delete newData[item.name].customers
      }
    }
    newData[item.name].amounts.push(item['ABS(sum(General_ledger.amount))']);
  });

  if(customer === "-" || customer === "") {
    title.type = "Customer";
    title.value = year + "-" + month;
  } else if(month === "-" || month === ""){
    title.type = "Month";
    title.value = customer;
  }

  return(
    <div>
        <h4>Charts</h4>
        {newData.revenue.amounts.length > 1
          && <Chart type = {'chart'} name = {'Revenue'} newData = {newData.revenue} title = {title}/>}
        {newData.cash.amounts.length > 1
          && <Chart type = {'chart'} name = {'Cash'} newData = {newData.cash} title = {title}/>}
        {newData['accounts payable'].amounts.length > 1 && <Chart type = {'chart'} name = {'Account Payable'} newData = {newData['accounts payable']} title = {title}/>}
        {newData.revenue.amounts.length === 1 && newData.cash.amounts.length === 1 && newData['accounts payable'].amounts.length === 1 &&
            <Chart type = {'pie'} name = {`Transaction on ${year}-${month}for ${customer}`} newData = {data} title = {title}/>
        }
    </div>
  )
}

export default Charts