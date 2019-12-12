import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Idea from '../ethereum/ideas';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class Contribute extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const idea = Idea(this.props.address); // contract instance
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await idea.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
      Router.replaceRoute(`/ideas/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            label="ether"
            labelPosition="right"
          />
          <Message error header="Something went wrong with the transaction!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Contribute</Button>
        </Form.Field>
      </Form>
    );
  }
}

export default Contribute;
