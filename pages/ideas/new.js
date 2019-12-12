import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class NewIdea extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0]
      });
      Router.pushRoute('/');
    } catch (err) {
      this.setState({errorMessage: err.message});
    }
    this.setState({loading: false});
  };

  render() {
    return(
      <Layout>
        <h3>Create an Idea!</h3>
        <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimum Contribution for Idea</label>
            <Input
              value={this.state.minimumContribution}
              onChange={event => this.setState({minimumContribution: event.target.value})}
              labelPosition="right"
              label="wei"
            />
          </Form.Field>
          <Message error header ="Oops Something went wrong with the transaction! - Value for minimum contribution must be a whole number in wei" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Create Idea!</Button>
        </Form>
      </Layout>
    );
  }
}

export default NewIdea;
