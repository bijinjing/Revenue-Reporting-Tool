import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Transactions from './components/Transactions.jsx';
import styled from 'styled-components';
import axios from 'axios';

const Body = styled.div`
  width: 80%;
  margin: 20px;
`;

const InputBox = styled.div`
  display: flex;
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year:"",
      month:"",
      transactions: [],
      mappedTransactions:[],
      totalCash:0,
      totalRevenue:0
    }
    this.DownloadHandler = this.DownloadHandler.bind(this);
    this.ParameterInputHandler = this.ParameterInputHandler.bind(this);
    this.MappingloadHandler = this.MappingloadHandler.bind(this);
  }

  DownloadHandler() {
    let option = {
      y:this.state.year,
      m:this.state.month
    };

    $.get('/transactions', option)
     .done((data) => {
      console.log(data);
        let totalCash = data.reduce((total,trx) => {return total + trx.amount},0)
        this.setState({
          totalCash,
          transactions: data
        })
      })
     .catch((err) => {
        console.log('err', err);
      })
  };

  MappingloadHandler() {
    let transactions = JSON.stringify(this.state.transactions);
    axios.get('/mapping', {params: {transactions: transactions}})
      .then((results) => {
        console.log(results.data);
        let totalRevenue = results.data.reduce((total,trx,index) => {return total + trx.feeRate * this.state.transactions[index].amount},0)
        console.log('revenue',totalRevenue);
        this.setState({
          totalRevenue,
          mappedTransactions: results.data
        })
      })
  }

  ParameterInputHandler({target}){
      this.setState({
        [target.name]:target.value
      })
  }


  ConfirmHandler({target}){
    this.setState({
      [target.name]:target.value
    })
  }

  render () {
    return (
    <Body>
      <h3>Cash Transactions</h3>
      <div>
        <InputBox>
          <div>
            <a>Year</a><input type = "text" name = "year" value ={this.state.year} onChange = {this.ParameterInputHandler}></input>
          </div>
          <div>
            <a>Month</a><input type = "text" name = "month" value ={this.state.month} onChange = {this.ParameterInputHandler}></input>
          </div>
        </InputBox>
        <button onClick={this.DownloadHandler}>Download</button>
        <button onClick={this.MappingloadHandler}>Mapping</button>
        <Transactions transactions = {this.state.transactions} mappedTransactions = {this.state.mappedTransactions} totalCash={this.state.totalCash} totalRevenue={this.state.totalRevenue} CalculateTotal={this.TotalCalculateHandler}/>
        <button>Post Entry</button>
      </div>
    </Body>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));