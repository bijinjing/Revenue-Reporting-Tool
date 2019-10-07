import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Transactions from './components/Transactions.jsx';
import JournalEntry from './components/JournalEntry.jsx';
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
      transactions: {},
      mappedTransactions:{},
      totalCash:0,
      totalRevenue:0,
      entryReady:false
    }
    this.DownloadHandler = this.DownloadHandler.bind(this);
    this.ParameterInputHandler = this.ParameterInputHandler.bind(this);
    this.MappingloadHandler = this.MappingloadHandler.bind(this);
    this.PostEntryHandler = this.PostEntryHandler.bind(this)
  }

  DownloadHandler() {
    let option = {
      y:this.state.year,
      m:this.state.month
    };

    $.get('/transactions', option)
     .done((data) => {
      console.log(data);
        // let totalCash = data.reduce((total,trx) => {return total + trx.amount},0)
        let totalCash = 0;
        let transactions = {}
        data.forEach(({id,description, amount, date},repId) => {
          repId += 1
          transactions[id] = {repId, description, amount, date};
          totalCash += amount;
        })
        this.setState({
          totalCash,
          transactions,
          mappedTransactions:{},
          totalRevenue:0,
          entryReady:false
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
        let mappedTransactions = {}
        let totalRevenue = 0;
        let totalPayable = 0;
        let mappingData = results.data
        let keyArr = Object.keys(mappingData);

        keyArr.forEach((id, key) => {
          let {feeRate, customer, customerId} = mappingData[id]
          let amount = this.state.transactions[id].amount;
          let revenue = amount * feeRate;
          let payable = amount - revenue;
          totalRevenue += revenue;
          totalPayable += payable;
          mappedTransactions[id] = {revenue, payable, customer,customerId, feeRate}
        })

        this.setState({
          totalRevenue,
          mappedTransactions,
          entryReady:true
        })
      })
  }

  PostSubledgerHandler() {
    let fullDateArr = this.state.transactions[0].date.split(" ")[0].split("-")
    let entryDate = fullDateArr[0] + "-"+ fullDateArr[1];
    let postDate = new Date(year, month, day);
    axios.post('/subLedger', {
      params: {
                postDate,
                entryDate,
                transactions:this.state.transactions,
                mappedTransactions:this.state.mappedTransactions
              }
    })
      .then((results) => {
        console.log(results.data);
        this.setState({
          entryReady:false
        })
      })
  }

  PostEntryHandler() {
    let fullDateArr = this.state.transactions[0].date.split(" ")[0].split("-")
    let entryDate = fullDateArr[0] + "-"+ fullDateArr[1];
    axios.post('/entry', {params: {date:entryDate,transactions: this.state.transactions, cash: this.state.totalCash,transactions:this.state.transactions }})
      .then((results) => {
        console.log(results.data);
        this.setState({
          entryReady:false
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
        {this.state.entryReady && <div>
          <JournalEntry cash={this.state.totalCash} revenue={this.state.totalRevenue}/>
          <button onClick={this.PostEntryHandler}>Post Entry</button>
        </div>}
      </div>
    </Body>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));