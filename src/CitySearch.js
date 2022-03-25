import React, { Component } from 'react';
import NumberOfEvents from './NumberOfEvents';

class CitySearch extends Component {
  state = {
      query: "",
      suggestions: [],
      showSuggestions: undefined
  };

  handleInputChange = (event) => {
      const value = event.target.value;
      this.setState({ query: value});
  };

  handleItemClicked = (suggestion) => {
      this.setState({
          query: suggestion,
          showSuggestions: false
      });
      this.props.updateEvents(suggestion);
  }

  render() {
      return (
          <div className='CitySearch'>
              <input type="text"
              className='city'
              value={this.state.query}
              onChange={this.handleInputChange}
              onFocus={() => { this.setState({ showSuggestions: true }) 
            }}
              />
              <ul className='suggestions' style={this.state.showSuggestions ? 
                {}: { display: 'none' }}>
                  {this.state.suggestions.map((suggestion) => (
                      <li key={suggestion}onClick={() => this.handleItemClicked(suggestion)}>
                          {suggestion}</li>
                  ))}
                  < li onClick={() => this.handleItemClicked('all')}>
                      <b>See all cities</b>
                      </li>
              </ul>
          </div>
      );
  }
}

export default CitySearch;