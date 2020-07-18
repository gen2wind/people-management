import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Redirect,Link } from 'react-router-dom';
 
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import {CONFIG} from '../constants';
import {handleDate} from '../helpers/helper';
import swal from 'sweetalert';

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
        let d = handleDate(date)
        this.setState({
            rawDate: d.rawDate,
            dob: d.date
        })
    }

    /* handleFirstName = (e) =>{
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
    }  */   

    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    
  onSubmit = (e) => {
    e.preventDefault();
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
            swal("Success: ", res.data.txt, "success");
        }else{
            swal("Error: ", res.data.txt, "error");
        }
    });
  }

    render() {
        const redirectToList = this.state.redirectToList;
        if (redirectToList === true) {
            return <Redirect to="/" />
        }
        return (
            <div style={{marginTop: 10}}>

            <div className="col-lg-12">
                <Link to={'/'} className="btn btn-primary rounded-pill float-right">Back to list</Link>
            </div>

            <h3>Add a Person</h3>
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
                    <input type="submit" value="Add Person" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}