import React, { Component } from 'react';
import axios from 'axios';
import '../public/stylesheets/SearchTable.css';
import Table from './Table';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      show: false,
      name: "",
      store: "", 
      location: "", 
      price: "", 
      rating: "",
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
    });
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleChangeStore = (e) => {
    this.setState({
      store: e.target.value
    });
  }

  handleChangeLocation = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  handleChangePrice = (e) => {
    this.setState({
      price: e.target.value
    });
  }

  handleChangeRating = (e) => {
    this.setState({
      rating: e.target.value
    });
  }

  handleClose = () => {
    this.setState({
      show: false
    });
  }
  
  handleShow = () => {
    this.setState({
      show: true
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    this.setState({
      show: false
    });
    let input = {};
    if (this.state.name !== ""){
      input.name = this.state.name;
    }
    if (this.state.store !== ""){
      input.store = this.state.store;
    }
    if (this.state.location !== ""){
      input.location = this.state.location;
    }
    if (this.state.price !== ""){
      input.price = this.state.price;
    }
    if (this.state.rating !== ""){
      input.rating = this.state.rating;
    }

    axios.post('/api/drinks', input)
        .then(res => {
          if(res.data){
            if(res.data.error){
              alert(res.data.error);
            }
          }
        })
        .catch(err => console.log(err))
  }

  render() {
    let modal = null;

    if (this.state.show === true) {
      modal = 
        <Modal 
           isOpen={this.state.show}
           contentLabel="Minimal Modal Example"
        >
          <div id = "modaltitle"><h2>Submit a Review</h2></div>
          <div id = "modalclose"><button class = "modalclosebutton" onClick={this.handleClose}>
            <i class="fa fa-times"></i></button>
          </div>
          <form className = "input">
            <div className = "formfield">
              Name of Drink : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangeName}></input>
            </div>
            <div className = "formfield">
              Store : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangeStore}></input>
            </div>
            <div className = "formfield">
              Location : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangeLocation}></input>
            </div>
            <div className = "formfield">
              Pre-Tax Price : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangePrice}></input>
            </div>
            <div className = "formfield">
              Rating : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangeRating}></input>
            </div>
            <button className = "submitButton" type="submit" onClick={this.submitForm}>Submit Review</button>
          </form>
        </Modal>
    }

    return (
      <div id = "container" className = "container">
        {modal}

        <div className = "add">
          <button className = "addButton" type="submit" onClick={this.handleShow}>Submit Review</button>
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