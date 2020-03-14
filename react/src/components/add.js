import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Redirect } from 'react-router-dom';
 
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import {CONFIG} from '../constants';

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            dob: '',
            phone: '',
            address: '',
            rawDate: new Date(),
            redirectToList: false
        };
      }


    handleDob = (date) =>{
        let d = new Date(date);
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        let dt = d.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        this.setState({
            rawDate: date,
            dob: year+'-' + month + '-'+dt
        })
    }

    handleFirstName = (e) =>{
        this.setState({
            first_name: e.target.value,
        })
    }

    handleLastName = (e) =>{
        this.setState({
            last_name: e.target.value,
        })
    }

    handlePhone = (e) =>{
        this.setState({
            phone: e.target.value,
        })
    }

    handleAddress = (e) =>{
        this.setState({
            address: e.target.value,
        })
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
    params.append('type','add_person');
    axios({
    method: 'post',
    url: CONFIG.APP_ENDPOINT,
    data: params
    }).then((res)=>{
        console.log(res);
        if(res.data.key===1){            
            this.setState({
                first_name: '',
                last_name: '',
                dob: '',
                phone: '',
                address: '',
                rawDate: new Date(),
                redirectToList: true
            })
        }
        alert(res.data.txt)
    });
  }

    render() {
        const redirectToList = this.state.redirectToList;
        if (redirectToList === true) {
            return <Redirect to="/" />
        }
        return (
            <div style={{marginTop: 10}}>
            <h3>Add a Person</h3>
            <form onSubmit={this.onSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>First Name:  </label>
                            <input type="text" value={this.state.first_name} onChange={this.handleFirstName}  className="form-control" />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>Last Name: </label>
                            <input type="text" value={this.state.last_name} onChange={this.handleLastName} className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>Phone: </label>
                            <input type="text" value={this.state.phone} onChange={this.handlePhone} className="form-control"/>
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
                            <textarea type="text" value={this.state.address} onChange={this.handleAddress}  className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add Person" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}