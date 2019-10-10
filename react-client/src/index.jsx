import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Transactions from './components/Transactions.jsx';
import Charts from './components/Charts.jsx';
import Reports from './components/Reports.jsx';
import JournalEntry from './components/JournalEntry.jsx';
import Customer from './components/Customer.jsx';
import SelectForm from './components/SelectForm.jsx';
import styled from 'styled-components';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

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
      customers:[],
      customer:"",
      type:"",
      report:[],
      reportStatus:false,
      entryStatus:false,
      entryReady:false,
      chartReady:false,
      chartStatus:false,
      chartParam:{},
      pageCount:0
    }
    this.DownloadHandler = this.DownloadHandler.bind(this);
    this.ParameterInputHandler = this.ParameterInputHandler.bind(this);
    this.MappingloadHandler = this.MappingloadHandler.bind(this);
    this.PostSubledgerHandler = this.PostSubledgerHandler.bind(this);
    this.ReportHandler = this.ReportHandler.bind(this);
    this.ChartHandler = this.ChartHandler.bind(this);
    // this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount(){
    axios.get('/customer', {
    })
      .then((results) => {
        let customers = results.data.map((item) => {
          return item.customerName
        })
        customers.unshift("-")
        this.setState({
          customers
        })
      })
  }

  DownloadHandler() {
    let option = {
      y:this.state.year,
      m:this.state.month
    };
    $.get('/transactions', option)
     .done((data) => {
        let totalCash = 0;
        let transactions = {}
        data.forEach(({id,description, amount, date},repId) => {
          repId += 1
          transactions[id] = {repId, description, amount, date};
          totalCash += amount;
        })
        let pageCount = Math.ceil(data.length / 10)
        this.setState({
          totalCash,
          transactions,
          mappedTransactions:{},
          totalRevenue:0,
          entryReady:false,
          entryStatus:true,
          reportStatus:false,
          chartReady:false,
          chartStatus:false,
          chartParam:{},
          pageCount
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
          mappedTransactions[id] = {revenue, payable, customer, customerId, feeRate}
        })

        this.setState({
          totalRevenue,
          mappedTransactions,
          entryReady:true,
          entryStatus:true,
          reportStatus:false,
          chartReady:false,
          chartStatus:false,
          chartParam:{}
        })
      })
  }


  PostSubledgerHandler() {
    axios.post('/subLedger', {
      params: {
        transactions:this.state.transactions,
        mappedTransactions:this.state.mappedTransactions
      }
    })
    .then((results) => {
      alert(results.data)
      this.setState({
        entryReady:false
      })
    })
  }


  ChartHandler({target}){
    if((this.state.month === "-"|| this.state.month === "" )&& (this.state.customer === "-" || this.state.customer === "")){
      alert ("Please select at least one cutomer or one month!")
    } else {
      let chartParam = {};
      chartParam.year = this.state.year;
      chartParam.month = this.state.month;
      chartParam.customer = this.state.customer
      this.setState({
        chartParam,
        chartStatus:true,
        entryReady:false,
        entryStatus:false,
        reportStatus:false,
        chartReady:false
      })
    }
  }

  ParameterInputHandler({target}){
    this.setState({
      [target.name]:target.value,
      chartReady:false,
      chartStatus:false
    })
  }

  ReportHandler({target}){
    axios.get('/report', {
      params: {
        year:this.state.year,
        month:this.state.month,
        customer:this.state.customer,
        type:this.state.type,
        chartParam:{}
      }
    })
    .then((results) => {
      if(results.data.length === 0){
        alert('No data avaiable, please update the filters!')
      } else {
        let pageCount = Math.ceil(results.data.length  / 10)
        this.setState({
          report:results.data,
          reportStatus:true,
          entryStatus:false,
          entryReady:false,
          chartReady:true,
          chartStatus:false,
          pageCount
        })
      }
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
            <a>Starting Year</a><SelectForm name = {'year'} listing={['-', '2019', '2018', '2017', '2016']} value = {this.state.year} handler = {this.ParameterInputHandler}/>
          </div>
          <div>
            <a>Starting Month</a><SelectForm name = {'month'} listing={['-','01','02','03','04','05','06','07','08','09','10','11','12']} value ={this.state.month} handler = {this.ParameterInputHandler}/>
          </div>
          <div>
            <a>Customer Name</a><SelectForm name = {'customer'} value = {this.state.customer} listing={this.state.customers} handler = {this.ParameterInputHandler}/>
          </div>
          <div>
            <a>Type</a><SelectForm name={'type'} value = {this.state.type} handler = {this.ParameterInputHandler} listing={['-','Revenue', 'Cash','Accounts Payable']}/>
          </div>
        </InputBox>

        <a>Book a Entry</a>
        <button onClick={this.DownloadHandler}>Download</button>
        <button onClick={this.MappingloadHandler}>Mapping</button>
        <a>Generate Report</a>
        <button onClick={this.ReportHandler}>Here</button>
        {this.state.chartReady&&<button onClick={this.ChartHandler}>Show Chart!</button>}

        { this.state.entryStatus &&<Transactions
          transactions = {this.state.transactions}
          mappedTransactions = {this.state.mappedTransactions}
          totalCash={this.state.totalCash}
          totalRevenue={this.state.totalRevenue}
          CalculateTotal={this.TotalCalculateHandler}
          />}

        {this.state.reportStatus &&<Reports
          report = {this.state.report}
          CalculateTotal={this.TotalCalculateHandler}
          />}

       {this.state.chartStatus &&<Charts
          data = {this.state.report} year = {this.state.chartParam.year} month = {this.state.chartParam.month} customer = {this.state.chartParam.customer}
          />}

        {this.state.entryReady && <div>
          <JournalEntry cash={this.state.totalCash} revenue={this.state.totalRevenue}/>
          <button onClick={this.PostSubledgerHandler}>Post Entry</button>
        </div>}
      </div>
    </Body>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

{/* <ReactPaginate
    previousLabel={'previous'}
    nextLabel={'next'}
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={this.state.pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={this.handlePageClick}
    containerClassName={'pagination'}
    subContainerClassName={'pages pagination'}
    activeClassName={'active'}
  /> */}

  // handlePageClick(data){
  //   let selected = data.selected;
  //   let offset = Math.ceil(selected * this.props.perPage);
  //   this.setState({ offset: offset }, () => {
  //     this.loadCommentsFromServer();
  //   });
  // }