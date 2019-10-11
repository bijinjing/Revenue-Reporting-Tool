import React from 'react';
import Transaction from './Transaction.jsx';
import styled from 'styled-components';


const TableHeader = styled.div`
  display: flex;
  font-weight: 700;
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  white-space: normal;
`;
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
          <div className="txn-data txn-id">ID</div>
          <div className="txn-data txn-desc">Description</div>
          <div className="txn-data">Cash Received</div>
          <div className="txn-data">Date</div>
        </div>
        <div className="bank-data">
          <div className="txn-data">Customer</div>
          <div className="txn-data">Fee Rate (%)</div>
          <div className="txn-data">Revenue Earned</div>
          <div className="txn-data">Payable</div>
        </div>
      </div>
  { Object.keys(transactions).map((id,key) => {
      return <Transaction trx={transactions[id]} mapping={mappedTransactions[id]?mappedTransactions[id]:{customer:"",feeRate:0,revenue:0,payable:0}}/>})}
       <TableButtom>
        <BankData>
          <Data></Data>
          <Data></Data>
          <Data>{'$' + (totalCash).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Data>
          <Data></Data>
        </BankData>
        <MappingData>
          <Data></Data>
          <Data></Data>
          <Data>{'$' + (totalRevenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Data>
          <Data>{'$' + (totalCash - totalRevenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Data>
        </MappingData>
      </TableButtom>
    </div>
  )
}


export default Transactions;