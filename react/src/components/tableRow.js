

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {CONFIG} from '../constants';
import axios from 'axios';


class TableRow extends Component {
  delete = () =>{
    axios({
      method: 'get',
      url: CONFIG.APP_ENDPOINT + "?type=delete_person&user_id="+this.props.obj.id,
      }).then((res)=>{
          console.log(res);
          if(res.data.key===1){ 
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
        <tr>
          <td>
            {this.props.obj.first_name}
          </td>
          <td>
            {this.props.obj.last_name}
          </td>
          <td>
            {this.props.obj.dob}
          </td>
          <td>
            {this.props.obj.phone}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;