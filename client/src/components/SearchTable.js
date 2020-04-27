import React, { Component } from 'react';
import axios from 'axios';
import '../public/stylesheets/SearchTable.css';
import Table from './Table';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ""
    };
  }

  componentDidMount = () => {
    let url = '/api/quicksearch?query='
    axios.get(url)
      .then(res => {
        console.log(res.data);
        if(res.data){
          this.setState({
            data: res.data
          })
        }
      })
      .catch(err => console.log(err))
  }

  quicksearchData = (e) => {
    e.preventDefault();
    console.log(this.state.value);
    if (this.state.value !== ""){
      let url = '/api/quicksearch?query=' + this.state.value.replace(' ', '+')
      axios.get(url)
        .then(res => {
          console.log(res.data);
          if(res.data){
            this.setState({
              data: res.data
            })
          }
        })
        .catch(err => console.log(err))
    } else {
      let url = '/api/quicksearch?query='
      axios.get(url)
        .then(res => {
          console.log(res.data);
          if(res.data){
            this.setState({
              data: res.data
            })
          }
        })
        .catch(err => console.log(err))
    }
  }


  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    // have a onclick which renders a new form on the page when it is clicked (advanced search)
    // if this.state.advancedsearch{ form = ... else null} 

    return (
      <div className = "container">

        <div className = "add">
          <button className = "addButton" type="submit">Submit Review</button>
        </div>

        <div className = "or">
           or
        </div>

        <div className = "search">
          <form className = "searchClass">
            <input type="text" onChange={this.handleChange} placeholder="Search.."></input>
            <button type="submit" onClick={this.quicksearchData}><i className="fa fa-search"></i></button>
          </form>
        </div>

        <div className = "whitespace3"></div>

        <div className = "add">
        </div>

        <div className = "or">
        </div>

        <div className = "search">
          <p><span className = "text">Advanced Search</span></p>
        </div>
        
        <div className="test">
          <Table data={this.state.data} />
        </div>
      </div>
    )
  }
}

export default Header