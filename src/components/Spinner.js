import React, { Component } from 'react'

import loading from './loading.gif';

export class Spinner extends Component {
  render() {
    return (
       <div className="text-center my-3"  style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}>
        <img
          src={loading}
          alt="spinner"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain"
          }}
        />
      </div>
    )
  }
}

export default Spinner
