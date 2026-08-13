import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    const { mode } = this.props;
    const isDark = mode === 'dark';

    return (
      <footer 
        className={`py-3 mt-auto text-center border-top ${
          isDark ? 'bg-dark text-light border-secondary' : 'bg-light text-muted border-light-subtle'
        }`}
        style={{
          boxShadow: isDark ? '0 -2px 10px rgba(0,0,0,0.3)' : '0 -2px 10px rgba(0,0,0,0.03)'
        }}
      >
        <div className="container">
          <p className="mb-0 small fw-medium" style={{ fontSize: '0.875rem', letterSpacing: '0.3px' }}>
            Developed by <span className={`fw-bold ${isDark ? 'text-info' : 'text-primary'}`}>Kiran Rathod</span>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer
