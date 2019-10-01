import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Transactions from './components/Transactions.jsx';
import styled from 'styled-components';

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
      mappedTransactions:[]
    }
    this.DownloadHandler = this.DownloadHandler.bind(this);
    this.ParameterInputHandler = this.ParameterInputHandler.bind(this);
    this.MappingloadHandler = this.MappingloadHandler.bind(this)
  }

  DownloadHandler() {
    let option = {
      y:this.state.year,
      m:this.state.month
    };

    $.get('/transactions', option)
     .done((data) => {
        this.setState({
          transactions: data
        })
      })
     .catch((err) => {
        console.log('err', err);
      })
  };

  MappingloadHandler() {
    let transactions = this.state.transactions;
    $.get('/mapping',{transactions})
     .done((data) => {
        this.setState({
          mappedTransactions: data
        })
      })
     .catch((err) => {
        console.log('err', err);
      })
  }

  ParameterInputHandler({target}){
      this.setState({
        [target.name]:target.value
      })
  }

  render () {
    {console.log('transaction',this.state.transactions)}
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
        <button onClick = {this.DownloadHandler}>Download</button>
        <button onClick = {this.MappingloadHandler}>Mapping</button>
        <Transactions transactions = {this.state.transactions} mappedTransactions = {this.state.mappedTransactions}/>
        <button>Post Entry</button>
      </div>
    </Body>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));