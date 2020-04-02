
import React, { Component } from 'react';
import axios from 'axios';
import TableRow from '../components/tableRow';

import {CONFIG} from '../constants';
import { Link } from 'react-router-dom';



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
          return <TableRow obj={object} key={i} rowKey={i}  deletePerson={this.delete}/>;
      }, this);
    }

    delete = (rowKey) =>{
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
                // Show messge of delete successfully
            }else{                    
                // Show messge of delete not successful
            }
            
            alert(res.data.txt)
        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
      return (
        <div>
          <h3 align="center">List of People</h3>
          <div className='float-right' style={{padding:'10px'}}>
            <Link to={'/add'} className="btn btn-primary" >Create</Link>
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
        </div>
      );
    }
  }