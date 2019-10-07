import React from 'react';
import styled from 'styled-components';

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

const TableRow = styled.div`
  display: none;
  font-weight: 700;
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  white-space: normal;
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

const Transaction = ({trx,mapping}) => (
  <TableRow>
    <BankData>
      <Data>{trx.repId}</Data>
      <Data>{trx.description}</Data>
      <Data value = {trx.amount}>{'$' + (trx.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Data>
      <Data>{trx.date.split(" ")[0]}</Data>
    </BankData>
    <MappingData>
      <Data>{mapping.customer}</Data>
      <Data>{(mapping.feeRate * 100).toString()}</Data>
      <Data>{'$' + (mapping.revenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Data>
      <Data>{'$' + (mapping.payable).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Data>
    </MappingData>
  </TableRow>
)

export default Transaction;