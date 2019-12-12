import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import Idea from '../../../ethereum/ideas';

class Index extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const idea = Idea(address);
    const requestCount = await idea.methods.getRequestCount().call();
    const approversCount = await idea.methods.approversCount().call();

    // CLEVER JS BELOW !
    // Array(1,2,3,4,5).fill().map((element, index) => index) === [0,1,2,3,4]
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return idea.methods.requests(index).call();
        })
    );
    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return <RequestRow
        request={request}
        key={index}
        id={index}
        address={this.props.address}
        approversCount={this.props.approversCount}
      />
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return(
      <Layout>
        <h3>List of Requests</h3>
        <Link route={`/ideas/${this.props.address}/requests/new`}>
          <a>
            <Button floated="right" style={{marginBottom: 10}} primary>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>#</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell></HeaderCell>
              <HeaderCell></HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Total Requests for this idea: {this.props.requestCount}</div>
      </Layout>
    );
  }
}

export default Index;
