import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Transactions from './components/Transactions.jsx';
import styled from 'styled-components';

const Body = styled.div`
  width: 80%;
  margin: 20px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetYear:"07",
      targetMonth:"2019",
      transactions: []
    }
    this.DownloadHandler = this.DownloadHandler.bind(this);
  }

  DownloadHandler() {
    let option = {
      y:'2017',
      m:'04'
    };

    $.get('/transactions',option)
     .done((data) => {
        console.log('react data', data);
        this.setState({
          transactions: data
        })
      })
     .catch((err) => {
        console.log('err', err);
      })
  };

  MappingloadHandler() {
    $.get('/transactions',option)
     .done((data) => {
        console.log('react data', data);
        this.setState({
          transactions: data
        })
      })
     .catch((err) => {
        console.log('err', err);
      })
  }




  render () {
    {console.log('transaction',this.state.transactions)}
    return (
    <Body>
      <h3>Cash Transactions</h3>
      <div>
        <button onClick = {this.DownloadHandler}>Download</button>
        <button onClick = {this.MappingHandler}>Mapping</button>
        <Transactions transactions = {this.state.transactions}/>
        <button>Post Entry</button>
      </div>
    </Body>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));