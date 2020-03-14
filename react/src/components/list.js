
import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './tableRow';

import {CONFIG} from '../constants';



export default class List extends Component {

  constructor(props) {
      super(props);
      this.state = {people: []};
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
      return this.state.people.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">List of People</h3>
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
        </div>
      );
    }
  }