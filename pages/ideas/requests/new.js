import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Idea from '../../../ethereum/ideas';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();

    const idea = Idea(this.props.address);
    const { description, value, recipient } = this.state; // arg for createRequest in this order => string description, uint value, address recipient

    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts();
      await idea.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({ from: accounts[0] });

      Router.pushRoute(`/ideas/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return(
      <Layout>
      <Link route={`/ideas/${this.props.address}/requests`}>
        <a>
          Go Back
        </a>
      </Link>
      <h3>Help with this idea</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

          <Form.Field>
            <label>What do you want to help with?</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>How much ether do you expect in return?</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient: Where do you want your ether sent too?</label>
            <Input
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>
          <Message error header="Oops Something went wrong with the transaction!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
