import React, { Component } from 'react'

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ searchInput: e.target.value });
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.props.onSearch) {
      this.props.onSearch(this.state.searchInput);
    }
  }

  render() {
    const { activeCategory, onCategoryChange } = this.props;
    const categories = [
      { id: 'general', label: 'General' },
      { id: 'business', label: 'Business' },
      { id: 'technology', label: 'Technology' },
      { id: 'sports', label: 'Sports' },
      { id: 'entertainment', label: 'Entertainment' },
      { id: 'health', label: 'Health' },
      { id: 'science', label: 'Science' }
    ];

    return (
      <header className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <a 
              className="navbar-brand fw-bold text-uppercase tracking-wide" 
              href="#home"
              onClick={(e) => { e.preventDefault(); if (onCategoryChange) onCategoryChange('general'); }}
            >
              <span className="bg-danger px-2 py-1 rounded me-2">News</span>Monkey
            </a>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {categories.map((cat) => (
                  <li className="nav-item" key={cat.id}>
                    <button
                      className={`nav-link btn btn-link text-start text-capitalize ${activeCategory === cat.id ? 'active fw-bold text-white' : ''}`}
                      onClick={() => onCategoryChange && onCategoryChange(cat.id)}
                      style={{ textDecoration: 'none' }}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
              <form className="d-flex" onSubmit={this.handleSearchSubmit}>
                <input
                  className="form-control me-2 form-control-sm"
                  type="search"
                  placeholder="Search news..."
                  aria-label="Search"
                  value={this.state.searchInput}
                  onChange={this.handleInputChange}
                />
                <button className="btn btn-outline-light btn-sm fw-semibold" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Navbar

