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

const Table = styled.div`
  flex-flow: column nowrap;
  font-size: .8rem;
  margin: 0.5rem;
  line-height: 1.5;
  flex: 1 1 auto;
`;

const Data = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0.5em;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0px;
  white-space: nowrap;
  border-bottom: 1px solid #d0d0d0;
`;

const BankData = styled.div`
  display: flex;
  background-color:light-gray;
  width: 50%;
`;

const MappingData = styled.div`
  display: flex;
  background-color:white;
  width: 50%;
`;

const Transactions = ({transactions, mappedTransactions,totalCash, totalRevenue, CalculateTotal}) => {
  return (
    <Table>
      <TableHeader>
        <BankData>
          <Data>ID</Data>
          <Data>Description</Data>
          <Data>Cash Received</Data>
          <Data>Date</Data>
        </BankData>
        <MappingData>
          <Data>Customer</Data>
          <Data>Fee Rate (%)</Data>
          <Data>Revenue Earned</Data>
          <Data>Payable</Data>
        </MappingData>
      </TableHeader>
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
    </Table>
  )
}


export default Transactions;