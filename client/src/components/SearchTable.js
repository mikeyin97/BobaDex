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
      advancedSearch: false,
      filterName: "",
      filterLocation: "",
      filterStore: "",
      minPrice: null,
      maxPrice: null,
      minRating: null,
      maxRating: null,
    };
  }

  componentDidMount = () => {
    let url = '/api/quicksearch?query='
    let data;
    axios.get(url)
      .then(res => {
        if(res.data){
          data = res.data;
          data.reverse()
          this.setState({
            data: data
          })
        }
      })
      .catch(err => console.log(err))
  }

  quicksearchData = (e) => {
    e.preventDefault();
    let data;
    console.log(this.state.value);
    if (this.state.value !== ""){
      let url = '/api/quicksearch?query=' + this.state.value.replace(' ', '+')
      axios.get(url)
        .then(res => {
          if(res.data){
            data = res.data;
            data.reverse()
            this.setState({
              data: data
            })
          }
        })
        .catch(err => console.log(err))
    } else {
      let url = '/api/quicksearch?query='
      axios.get(url)
        .then(res => {
          if(res.data){
            data = res.data;
            data.reverse()
            this.setState({
              data: data
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

  handleFilterName = (e) => {
    this.setState({
      filterName: e.target.value
    });
  }

  handleChangeStore = (e) => {
    this.setState({
      store: e.target.value
    });
  }

  handleFilterStore = (e) => {
    this.setState({
      filterStore: e.target.value
    });
  }

  handleChangeLocation = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  handleFilterLocation = (e) => {
    this.setState({
      filterLocation: e.target.value
    });
  }

  handleChangePrice = (e) => {
    this.setState({
      price: e.target.value
    });
  }
  
  handleMaxPrice = (e) => {
    this.setState({
      maxPrice: e.target.value
    });
  }

  handleMinPrice= (e) => {
    this.setState({
      minPrice: e.target.value
    });
  }

  handleChangeRating = (e) => {
    this.setState({
      rating: e.target.value
    });
  }

  handleMaxRating = (e) => {
    this.setState({
      maxRating: e.target.value
    });
  }

  handleMinRating = (e) => {
    this.setState({
      minRating: e.target.value
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

  applyFilter = (e) => {
    e.preventDefault();
    let data;
    
    let input = "";
    if (this.state.filterName !== ""){
      input = input + "name=" + this.state.filterName + "&"
    }
    if (this.state.filterStore !== ""){
      input = input + "store=" + this.state.filterStore + "&"
    }
    if (this.state.filterLocation !== ""){
      input = input + "location=" + this.state.filterLocation + "&"
    }
    if (this.state.maxPrice !== null){
      input = input + "maxPrice=" + this.state.maxPrice + "&"
    }
    if (this.state.minPrice !== null){
      input = input + "minPrice=" + this.state.minPrice + "&"
    }
    if (this.state.maxRating !== null){
      input = input + "maxRating=" + this.state.maxRating + "&"
    }
    if (this.state.minRating !== null){
      input = input + "minRating=" + this.state.minRating + "&"
    }

    if (input !== ""){
      input = input.substring(0, input.length - 1);
    }

    axios.get('/api/search?' + input)
        .then(res => {
          if(res.data){
            data = res.data;
            data.reverse()
            this.setState({
              data: data
            })
          }
        })
        .catch(err => console.log(err))
  }

  openAdvancedSearch = () =>{
    this.setState({
      advancedSearch: !this.state.advancedSearch
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    
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
    
    window.location.reload();
  }

  render() {
    let modal = null;
    let advancedSearch = null;

    if (this.state.show === true) {
      modal = 
        <Modal 
           isOpen={this.state.show}
           contentLabel="Minimal Modal Example"
        >
          <div id = "modaltitle"><h2>Submit a Review</h2></div>
          <div id = "modalclose"><button className = "modalclosebutton" onClick={this.handleClose}>
            <i className="fa fa-times"></i></button>
          </div>
          <form className = "input">
            <div className = "formfield">
              Name of Drink* : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangeName}></input>
            </div>
            <div className = "formfield">
              Store* : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangeStore}></input>
            </div>
            <div className = "formfield">
              Location : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangeLocation}></input>
            </div>
            <div className = "formfield">
              Pre-Tax Price : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangePrice}></input>
            </div>
            <div className = "formfield">
              Rating* : &nbsp;&nbsp;&nbsp;<input type="text" onChange={this.handleChangeRating}></input>
            </div>
            <div className = "whitespace4">
              * = required
            </div>
           
            <button className = "submitButton" type="submit" onClick={this.submitForm}>Submit Review</button>
          </form>
        </Modal>
    }

    if (this.state.advancedSearch === true) {
      advancedSearch =
        <div className = "advanced">
          <div className = "add">
            </div>
          <div className = "or">
            </div> 
          <div className = "search" id="advancedsearch">
            <div className = "formfield2">
              <b>Name of Drink</b> contains &nbsp;<input type="text" onChange={this.handleFilterName}></input>
            </div>
            <div className = "formfield2">
              <b>Store</b> contains &nbsp;<input type="text" onChange={this.handleFilterStore}></input>
            </div>
            <div className = "formfield2">
              <b>Location</b> contains &nbsp;<input type="text" onChange={this.handleFilterLocation}></input>
            </div>
            <div className = "formfield2">
              <b>Price</b> is above &nbsp;<input type="text" onChange={this.handleMinPrice}></input> 
              and below &nbsp;<input type="text" onChange={this.handleMaxPrice}></input>
            </div>
            <div className = "formfield2">
              <b>Rating</b> is above &nbsp;<input type="text" onChange={this.handleMinRating}></input >
              and below &nbsp;<input type="text" onChange={this.handleMaxRating}></input>
            </div>
            <button className = "submitButton2" type="submit" onClick={this.applyFilter}>Apply Filter</button>
          </div>
        </div>
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
          <p><span className = "text" onClick = {this.openAdvancedSearch}>Advanced Search</span></p>
        </div>
        {advancedSearch}
        
        <div className="test">
          <Table data={this.state.data} />
        </div>
      </div>
    )
  }
}

export default Header