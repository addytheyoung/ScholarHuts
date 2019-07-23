import React from 'react';
import * as firebase from 'firebase';


export default class ProfileModal extends React.Component {

    logoutFunc() {
        firebase.auth().signOut();
        document.location.reload();
    }

    posts() {

    }

    render() {
        return (
            <div>
                <div className="div-button">

                    <button className="button-login" onClick={() => this.posts()}>
                        <a href="my-posts">
                            <h1>My posts</h1>
                        </a>
                    </button>
                </div>
                <br />
                <div className="div-button">
                    <button className="button-login" onClick={() => this.logoutFunc()}>
                        <a>
                            <h1>Logout</h1>
                        </a>

                    </button>
                </div>
            </div>
        )
    }
}