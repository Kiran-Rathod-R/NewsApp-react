import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'general',
      searchQuery: '',
      mode: 'light'
    };
  }

  toggleMode = () => {
    if (this.state.mode === 'light') {
      this.setState({ mode: 'dark' });
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#ffffff';
    } else {
      this.setState({ mode: 'light' });
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
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
    const { mode, category, searchQuery } = this.state;

    return (
      <div className={mode === 'dark' ? 'bg-dark text-light min-vh-100 pb-5' : 'bg-light text-dark min-vh-100 pb-5'}>
        <Navbar 
          activeCategory={category} 
          onCategoryChange={this.handleCategoryChange}
          onSearch={this.handleSearch}
          mode={mode}
          toggleMode={this.toggleMode}
        />
        <News 
          key={`${category}-${searchQuery}`}
          pagesize={6} 
          country="in"
          category={category}
          searchQuery={searchQuery}
          mode={mode}
        />
      </div>
    )
  }
}

