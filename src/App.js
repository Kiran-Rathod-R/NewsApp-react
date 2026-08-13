import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'general',
      searchQuery: ''
    };
  }

  handleCategoryChange = (newCategory) => {
    this.setState({
      category: newCategory,
      searchQuery: ''
    });
  }

  handleSearch = (query) => {
    this.setState({
      searchQuery: query
    });
  }

  render() {
    return (
      <div className="bg-light min-vh-100 pb-5">
        <Navbar 
          activeCategory={this.state.category} 
          onCategoryChange={this.handleCategoryChange}
          onSearch={this.handleSearch}
        />
        <News 
          key={`${this.state.category}-${this.state.searchQuery}`}
          pagesize={6} 
          country="in"
          category={this.state.category}
          searchQuery={this.state.searchQuery}
        />
      </div>
    )
  }
}
