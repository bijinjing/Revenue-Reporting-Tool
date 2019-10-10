import React from "react";
import Chart from "./Chart.jsx"

function Charts({data}){
  let newData = {
    'revenue':{
      customers:[],
      amounts:[]
    },
    'cash':{
      customers:[],
      amounts:[]
    },
    'accounts payable':{
      customers:[],
      amounts:[]
    }
  }
  console.log('report',data,'newdata',newData)

  data.forEach((item) => {
    newData[item.name].customers.push(item.customerName);
    newData[item.name].amounts.push(item['ABS(sum(General_ledger.amount))']);
  });
  let date = data[0].entryDate;

  console.log('newdatalength',newData.revenue.customers.length )


  return(
    <div>
        <h2>Charts</h2>
        {newData.revenue.customers.length > 1 && <Chart type = {'chart'} name = {'revenue'} newData = {newData.revenue} date = {date}/>}
        {newData.cash.customers.length > 1 && <Chart type = {'chart'} name = {'cash'} newData = {newData.cash} date = {date}/>}
        {newData['accounts payable'].customers.length > 1 && <Chart type = {'chart'} name = {'payable'} newData = {newData['accounts payable']} date = {date}/>}
        {newData.revenue.customers.length === 1 && newData.cash.customers.length === 1 && newData['accounts payable'].customers.length === 1 &&
            <Chart type = {'pie'} name = {'all'} newData = {data} date = {date}/>
        }
    </div>
  )
}

export default Charts