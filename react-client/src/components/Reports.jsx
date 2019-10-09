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

const Line = ({line,id}) => (
        (<BankData>
          <Data>{id}</Data>
          <Data>{line.customerName}</Data>
          <Data>{line.name}</Data>
          <Data>{line.entryDate}</Data>
          <Data>{line['sum(General_ledger.amount)']}</Data>
        </BankData>)
        )

const Reports = ({report}) => {
  return (
    <Table>
      <TableHeader>
        <BankData>
          <Data>ID</Data>
          <Data>Customer</Data>
          <Data>Type</Data>
          <Data>Month</Data>
          <Data>Amount</Data>
        </BankData>
      </TableHeader>
      {report.map((line,key) => {
        return <Line id={key+1} line = {line}/>
        })

      }
       {/* <TableButtom>
        <BankData>
          <Data></Data>
          <Data></Data>
          <Data>{'$' + (totalCash).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Data>
          <Data></Data>
        </BankData>
      </TableButtom> */}
    </Table>
  )
}

export default Reports;