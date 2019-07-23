import React from 'react';
import logo from './Texas_Longhorns_logo.svg';


export default class Contact extends React.Component {
    render() {
        return (
            <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                <div class="header-banner" style={{ position: "relative" }}>
                    <div class="div-logo">
                        <a href="/sublets">
                            <img src={logo} class="logo-img" id="zzzzz" />
                        </a>
                    </div>

                </div>

                <h2>Hi there! My name is Andrew Young. Below is my email. Please feel free to contact me.</h2>

                <h3>andrewtateyoung@gmail.com</h3>
            </div>
        )
    }
}