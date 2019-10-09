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

  data.forEach((item) => {
    newData[item.name].customers.push(item.customerName);
    newData[item.name].amounts.push(item['sum(General_ledger.amount)']);
  });
  let date = data[0].entryDate;


  return(
    <div>
        <h2>Charts</h2>
        {this.state.newData.revenue.customers.length > 1 && <Chart type = {'chart'} name = {'revenue'} newData = {newData.revenue} date = {date}/>}
        {this.state.newData.cash.customers.length > 1 && <Chart type = {'chart'} name = {'cash'} newData = {newData.cash} date = {date}/>}
        {this.state.newData['accounts payable'].customers.length > 1 && <Chart type = {'chart'} name = {'payable'} newData = {newData['accounts payable']} date = {date}/>}
        {this.state.newData.revenue.customers.length === 1 && this.state.newData.cash.customers.length === 1 && this.state.newData['accounts payable'].customers.length === 1 &&
            <Chart type = {'pie'} name = {'all'} newData = {data} date = {date}/>
        }
    </div>
  )
}

export default Charts