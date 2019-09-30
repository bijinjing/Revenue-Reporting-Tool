import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import styled from 'styled-components';

const txn_header = styled.div`
  font-weight: 700;
  background-color: #008489;
`;

const txn_table = styled.div`
  display: flex;
  flex-flow: column nowrap;
  font-size: .8rem;
  margin: 0.5rem;
  line-height: 1.5;
  flex: 1 1 auto;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    }
  }


  // componentDidMount() {
  //   $.ajax({
  //     url: '/transactions',
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  render () {
    return (
    <div className="txn">
      <h1>Cash Transactions</h1>
      <txn_table>
        <txn_header>
          <div className="txn-data">Description</div>
          <div className="txn-data">Amount</div>
          <div className="txn-data">Date</div>
        </txn_header>
      </txn_table>
      {/* <Transactions transactions={this.state.transactions}/> */}
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));