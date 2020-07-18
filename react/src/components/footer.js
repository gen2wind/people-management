

import React, { Component } from 'react';
import {copyrightDate} from '../helpers/helper';

class Footer extends Component {

  render() {
    let d = copyrightDate();
    
    console.log(d.date)
    return (      
        <footer className="text-center">
            <div> © {d.copyrightDate} Designed and Developed by Ogunyemi Oludayo 
                <a className="text-grey" href="#!"> +2348074288823 </a>
            </div>
        </footer>
    );
  }
}

export default Footer;