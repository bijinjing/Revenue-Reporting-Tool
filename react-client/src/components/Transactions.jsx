import React from 'react';
import Transaction from './Transaction.jsx';
import styled from 'styled-components';

const TableButtom = styled.div`
  display: flex;
  font-weight: 700;
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  white-space: normal;
`;

const MappingData = styled.div`
  display: flex;
  background-color:white;
  width: 50%;
`;

const Transactions = ({transactions, mappedTransactions,totalCash, totalRevenue, CalculateTotal}) => {
  return (
    <div className="txn-table">
      <div className="txn-row">
        <div className="bank-data">
          <div className="txn-data txn-id txn-center txn-header">ID</div>
          <div className="txn-data txn-desc txn-center txn-header">Description</div>
          <div className="txn-data txn-center txn-header">Cash Received</div>
          <div className="txn-data txn-center txn-header">Date</div>
        </div>
        <div className="bank-data">
          <div className="txn-data txn-center txn-header">Customer</div>
          <div className="txn-data txn-center txn-header">Fee Rate (%)</div>
          <div className="txn-data txn-center txn-header">Revenue Earned</div>
          <div className="txn-data txn-center txn-header">Payable</div>
        </div>
      </div>
  { Object.keys(transactions).map((id,key) => {
      return <Transaction trx={transactions[id]} mapping={mappedTransactions[id]?mappedTransactions[id]:{customer:"",feeRate:0,revenue:0,payable:0}}/>})}
      <div className="TableButtom">
        <div className="bank-data">
          <div className="txn-data txn-id"></div>
          <div className="txn-data txn-desc"></div>
          <div className="txn-data">{'$ ' + (totalCash).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</div>
          <div className="txn-data"></div>
        </div>
        <div className="bank-data">
          <div className="txn-data"></div>
          <div className="txn-data"></div>
          <div className="txn-data">{'$ ' + (totalRevenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</div>
          <div className="txn-data">{'$ ' + (totalCash - totalRevenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</div>
        </div>
      </div>
    </div>
  )
}


export default Transactions;