import React from 'react';
import styled from 'styled-components';
const RowHeader = styled.div`
  display: flex;
  margin: 5px;
  font-weight: 700;
`;
const Row = styled.div`
  display: flex;
  margin: 5px;
`;
const Line = styled.div`
  margin:5px;
  width:180px;
  align:right
`;
const TyeLine = styled.div`
  width:200px;
  margin:5px;
  align:left;
`;

const JournalEntry = ({cash,revenue}) => (
  <div>
    <RowHeader>
      <TyeLine>Account</TyeLine>
      <Line>Debit</Line>
      <Line>Credit</Line>
    </RowHeader>
    <Row>
      <TyeLine>Cash</TyeLine>
      <Line>{'$' + (cash).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Line>
      <Line></Line>
    </Row>
    <Row>
      <TyeLine>Revenue</TyeLine>
      <Line></Line>
      <Line>{'$' + (revenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Line>
    </Row>
    <Row>
      <TyeLine>Customer Payables</TyeLine>
      <Line></Line>
      <Line>{'$' + (cash - revenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString()}</Line>
    </Row>
</div>
)
export default JournalEntry;