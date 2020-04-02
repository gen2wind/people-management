

import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class TableRow extends Component {

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
            { this.props.isEdit ?
              <button onClick={()=> this.props.showModal('edit',this.props.rowKey)} className="btn btn-primary">Edit</button>:
              <Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
            }
          </td>
          <td>
              <button onClick={()=> this.props.deletePerson(this.props.rowKey)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;