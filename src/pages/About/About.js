import React, { useState, useEffect} from 'react';
import {MDBContainer} from "mdbreact";
import './About.scss';

export default function About(props){


    useEffect(()=> {

    }, []);

    return(
        <MDBContainer fluid style={{backgroundColor:'white'}}>
           <MDBContainer style={{textAlign:'center'}}>
             <h2>About</h2>
               <span>
                 <ul>
                     <li>

                     </li>
                     <li>

                     </li>
                     <li>

                     </li>
                 </ul>
               </span>
           </MDBContainer>
        </MDBContainer>
    );
}
