import React from 'react';
import styled from 'styled-components';


const Transaction = ({trx,mapping}) => (
  <div className="txn-row">
    <div className="bank-data">
      <div className={"txn-data txn-id"}>{trx.repId}</div>
      <div className={"txn-data txn-desc"}>{trx.description}</div>
      <div className="txn-data" value = {trx.amount}>{'$' + (trx.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</div>
      <div className="txn-data">{trx.date.split(" ")[0]}</div>
    </div>
    <div className="bank-data">
      <div className="txn-data">{mapping.customer}</div>
      <div className="txn-data">{(mapping.feeRate * 100).toString()}</div>
      <div className="txn-data">{'$' + (mapping.revenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</div>
      <div className="txn-data">{'$' + (mapping.payable).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</div>
    </div>
  </div>
)

export default Transaction;