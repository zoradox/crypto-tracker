import React from 'react';
import axios from 'axios';
import { Icon, Item, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import './DashboardComponent.css';

class DashboardComponent extends React.Component {
  state = {
    currency: null,
    data: null,
    error: null
  }

  handleInputChange = (e) => {
    this.setState({
      currency: e.target.value,
    });
  }

  handleSearch = () => {
    if(this.state.currency) {
      axios.get(`https://api.coinmarketcap.com/v1/ticker/${this.state.currency}`)
        .then((response) => {
          this.setState({
            data: response.data[0],
            error: null
          });
        }).catch((err)=> {
          this.setState({
            error: true,
          });
        });
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  render() {
    const { data } = this.state;
    return(
      <div className="dashboard">
        <div className="logout">
          <Button basic onClick={this.handleLogout}>Logout</Button>
        </div>
        <div className="search-container">
          <input onChange={this.handleInputChange} type="text" id="search-bar" placeholder="Enter currency currency name (bitcoin)"/>
          <a onClick={this.handleSearch}  className="search-icon"><Icon name='search' size="big"/></a>
          {
            data ? (
              <Item.Group divided>
                <Item>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'>Crypto Currency Name</Item.Header>
                    <Item.Description content={`${data.name} (${data.symbol})`} />
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'>Crypto Currency Rank</Item.Header>
                    <Item.Description content={data.rank} />
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'>Price (USD)</Item.Header>
                    <Item.Description content={data.price_usd} />
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'>Price (BTC)</Item.Header>
                    <Item.Description content={data.price_btc} />
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'>% Change (1hr)</Item.Header>
                    <Item.Description content={data.percent_change_1h} />
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'>% Change (7 days)</Item.Header>
                    <Item.Description content={data.percent_change_7d} />
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'>Maximum supply</Item.Header>
                    <Item.Description content={data.max_supply} />
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'>Available supply</Item.Header>
                    <Item.Description content={data.available_supply} />
                  </Item.Content>
                </Item>
              </Item.Group>
            ) : <h3>No search result, try again...</h3>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(DashboardComponent);
