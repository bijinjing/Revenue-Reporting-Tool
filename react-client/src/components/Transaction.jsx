import React from 'react';


const Transaction = ({trx,mapping}) => (
  <div className="txn-row">
    <div className="bank-data">
      <div className={"txn-data txn-id txn-center"}>{trx.repId}</div>
      <div className={"txn-data txn-desc txn-center"}>{trx.description}</div>
      <div className={"txn-data txn-right"} value = {trx.amount}>{'$ ' + (trx.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</div>
      <div className={"txn-data txn-center"}>{trx.date.split(" ")[0]}</div>
    </div>
    <div className="bank-data">
      <div className={"txn-data txn-center"}>{mapping.customer}</div>
      <div className={"txn-data txn-center"}>{(mapping.feeRate * 100).toString()}</div>
      <div className={"txn-data txn-right"}>{'$ ' + (mapping.revenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</div>
      <div className={"txn-data txn-right"}>{'$ ' + (mapping.payable).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</div>
    </div>
  </div>
)

export default Transaction;