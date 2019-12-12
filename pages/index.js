import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';

class Index extends Component {
    static async getInitialProps() { // skips initial rendering next attribute
      const ideas = await factory.methods.getDeployedCampaigns().call();
      return {ideas};
    }

    renderIdeas() {
      const items = this.props.ideas.map(address => {
        return {
          header: address,
          description: (
            <Link route={`/ideas/${address}`}> 
              <a>View Idea</a>
            </Link>
          ),
          fluid: true
        };
      });
      return <Card.Group items={items} />;
    }

    render() {
      return (
        <Layout>
          <div>
            <h3>Enlisted Ideas</h3>
              <Link route="/ideas/new">
                <a>
                  <Button
                    floated="right"
                    content="Enlist Idea"
                    icon="add circle"
                    primary
                    />
                </a>
              </Link>

            {this.renderIdeas()}
          </div>
        </Layout>
      );
    };
}

export default Index;
