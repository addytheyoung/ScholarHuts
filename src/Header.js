import React from 'react';
import SignedOutHeader from './SignedOutHeader.js'
import SignedInHeader from './SignedInHeader.js';





export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {

        var temp = localStorage.getItem("signedin");
        if (temp == "true") {

            return (
                <SignedInHeader onChange2={this.props.onChange} />
            )
        } else {
            return (
                <SignedOutHeader />

            )
        }
    }
}