import React from 'react';
import './SignedInHeader.css';
import * as firebase from 'firebase';
import { unionTypeAnnotation } from '@babel/types';


export default class MessagesModal extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        if (this.props.messages == null || this.props.messages.length == 0) {
            return (

                <a href="/inbox" style={{ textDecoration: "none" }}>
                    No messages.
        </a>
            )


        } else {
            const temp = this.props.messages.map(ele => {
                return (
                    <div>
                        <a href="/inbox" style={{ textDecoration: "none" }}>
                            {ele.message}
                        </a>
                    </div>
                )
            })
            return (
                <div className="messages-small-inbox">

                    <br></br>
                    <div>
                        {temp}
                    </div>

                </div>
            )

        }







    }
}