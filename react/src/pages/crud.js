
import React, { Component } from 'react';
import axios from 'axios';
import TableRow from '../components/tableRow';

import {CONFIG} from '../constants';

import { Modal } from 'react-bootstrap'
import {handleDate} from '../helpers/helper';
import DatePicker from "react-datepicker";
import swal from 'sweetalert';



export default class Crud extends Component {

  constructor(props) {
      super(props);
      this.state = {
        people: [],
        showModal:false,
        modalTitle:'',
        isAddModal:true,
        editKey:0,
        editId:0,

        
        first_name: '',
        last_name: '',
        dob: '',
        phone: '',
        address: '',
        rawDate: new Date(),
      };
    }
    componentDidMount = () =>{
        axios({
            method: 'get',
            url: CONFIG.APP_ENDPOINT + "?type=get_all",
            }).then((res)=>{
                console.log(res);
                if(res.data.key===1){ 
                    this.setState({ people: res.data.txt });
                }
            }).catch(function (error) {
                console.log(error);
            })
    }
    tabRow = () =>{
      return this.state.people.map((object, i) => {
          let tr = <TableRow obj={object} key={i} rowKey={i} deletePerson={this.delete} isEdit={true} showModal={this.showModal}/>;
          return tr;
      });
    }

    
    handleDob = (date) =>{
      let d = handleDate(date)
      this.setState({
          rawDate: d.rawDate,
          dob: d.date
      })
    }  

    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    delete = (rowKey) =>{
      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to leave this page?",
        icon: "warning",
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          const people = this.state.people;
          const person = people[rowKey];
          axios({
            method: 'get',
            url: CONFIG.APP_ENDPOINT + "?type=delete_person&user_id="+person.id,
            }).then((res)=>{
                console.log(res);
                if(res.data.key===1){ 
                  const people = this.state.people.filter(p => p.id !== person.id);
                  this.setState({
                    people:people
                  })
                  swal("Success", res.data.txt, "success");
              }else{                    
                swal("Error", res.data.txt, "error");
              }
            }).catch(function (error) {
                console.log(error);
            })
        }
      });
      /* const people = this.state.people;
      const person = people[rowKey];
      axios({
        method: 'get',
        url: CONFIG.APP_ENDPOINT + "?type=delete_person&user_id="+person.id,
        }).then((res)=>{
            console.log(res);
            if(res.data.key===1){ 
              const people = this.state.people.filter(p => p.id !== person.id);
              this.setState({
                people:people
              })
              swal("Success: ", res.data.txt, "success");
          }else{                    
            swal("Error: ", res.data.txt, "error");
          }
            
            alert(res.data.txt)
        }).catch(function (error) {
            console.log(error);
        }) */
    }

      
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.dob + ' asasad ' + this.state.rawDate);
    const params = new URLSearchParams();
    params.append('first_name', this.state.first_name);
    params.append('last_name', this.state.last_name);
    params.append('phone', this.state.phone);
    params.append('dob', this.state.dob);
    params.append('address', this.state.address);
    if(this.state.isAddModal){
      params.append('type','add_person');
    }else{      
      params.append('type','edit_person');
      params.append('user_id', this.state.editId);
    }
    axios({
    method: 'post',
    url: CONFIG.APP_ENDPOINT,
    data: params
    }).then((res)=>{
        console.log(res);
        if(res.data.key===1){ 
          let changedData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            dob: this.state.dob,
            phone: this.state.phone,
            address: this.state.address,
          }
           if(this.state.isAddModal){
              changedData.id = res.data.newId;
              this.setState({
                people: [...this.state.people,changedData],
              })
           }else{
              let people = this.state.people;
              changedData.id = people[this.state.editKey].id;
              people[this.state.editKey] = changedData;
              this.setState({
                people: people,
              })
           }
          

            this.setState({
                first_name: '',
                last_name: '',
                dob: '',
                phone: '',
                address: '',
                rawDate: new Date(),
                showModal:false,
            })
            swal("Success: ", res.data.txt, "success");
        }else{                    
          swal("Error: ", res.data.txt, "error");
        }
    });
  }

    
    closeModal = () => {
      this.setState({
        showModal:false
      })
    };
    showModal = (type,rowKey) => {
      //console.log(type);
      if(type==='edit' && rowKey !== undefined){ 
        const person = this.state.people[rowKey];
        console.log(person);       
        this.setState({
          showModal:true,
          modalTitle: 'Edit a person',
          isAddModal:false,
          editKey:rowKey,         
          editId:person.id,         
        
          first_name: person.first_name,
          last_name: person.last_name,
          dob: person.dob,
          phone: person.phone,
          address: person.address,
          rawDate: new Date(person.dob),
        })
      }else{
        this.setState({
          showModal:true,
          modalTitle: 'Add a Person',
          isAddModal:true,
          editKey:0,                
          editId:0,
        
          first_name: '',
          last_name: '',
          dob: '',
          phone: '',
          address: '',
          rawDate: new Date(),
        })
      }
    };


    render() {
      return (
        <div>
          <h3 align="center">List of People</h3>
          <div className='float-right' style={{padding:'10px'}}>
            <button onClick={() => this.showModal('add')} className="btn btn-primary round-button">+</button>
          </div>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Phone Number</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>

          
          <Modal show={this.state.showModal} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              
            <h3>{this.state.modalTitle}</h3>
            <form onSubmit={this.onSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>First Name:  </label>
                            <input name='first_name' type="text" value={this.state.first_name} onChange={this.handleInput}  className="form-control" />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>Last Name: </label>
                            <input name='last_name' type="text" value={this.state.last_name} onChange={this.handleInput} className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>Phone: </label>
                            <input name='phone' type="text" value={this.state.phone} onChange={this.handleInput} className="form-control"/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>Date of Birth:  </label><br/>
                            <DatePicker selected={this.state.rawDate} onChange={this.handleDob} className="form-control" dateFormat="y-MM-d" />
                        </div>
                    </div>
                </div>
                
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="form-group">
                            <label>Address: </label>
                            <textarea name='address' type="text" value={this.state.address} onChange={this.handleInput}  className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value={this.state.isAddModal ? "Add a person" : "Save Person"} className="btn btn-primary"/>
                </div>
            </form>



            </Modal.Body>
          </Modal>

        </div>
      );
    }
  }