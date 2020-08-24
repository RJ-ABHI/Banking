import React, { Component } from 'react';
class homePage extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="mt-2">
                <h2 className="text-danger text-center">Welcome to DBI BANK</h2>
        <img src="https://img.etimg.com/thumb/width-640,height-480,imgsize-123119,resizemode-1,msid-74408402/industry/banking/finance/banking/view-interventions-a-four-pronged-approach-have-made-clean-and-credit-ready-banks-the-new-normal/bank-agencies.jpg" 
        alt=""
            style={{marginLeft:"350px",height:"400px"}}
        />
            </div>
         );
    }
}
 
export default homePage;