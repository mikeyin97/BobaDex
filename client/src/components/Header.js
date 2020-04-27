import React, { Component } from 'react';
import '../public/stylesheets/Header.css';
import header from '../public/images/header.png'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div id = "header">
        <div id = "whitespace1"></div>
        <div id = "image">
          <img src={header}>
          </img>
        </div>
        <div id = "whitespace2"></div>
      </div>
      
    )
  }
}

export default Header