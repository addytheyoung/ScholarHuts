import React from 'react';
import App from './App.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PostApartment from './PostApartment.js';
import './App.css';
import Header from './Header.js';
import UniqueApartment from './UniqueApartment.js';
import Inbox from './Inbox.js';
import Board from './Board.js';
import Feedback from './Feedback.js';
import MySubletPosts from './MySubletPosts.js';
import PrivacyPolicy from './PrivacyPolicy.js';
import Contact from './Contact.js';




export default class RouterTest extends React.Component {
    constructor(props) {
        super(props);
    }




    render() {



        if (localStorage.getItem("signedin") != "true") {

            return (
                <Router>
                    <Route exact={true} path="/" render={() => (
                        <App />
                    )} />
                    <Route path="/apartments" render={() => (
                        <App />
                    )} />
                    <Route path="/sublets" render={() => (
                        <App />
                    )} />
                    <Route path="/post" component={UniqueApartment} />
                    <Route path="/my-posts" render={() => (
                        <h1>Please sign in to see your posts.</h1>
                    )} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/privacy-policy" component={PrivacyPolicy} />
                    <Route path="/contact" component={Contact} />
                </Router>
            )
        } else {
            return (

                < Router >
                    <Route exact={true} path="/" render={() => (
                        <App />
                    )} />
                    <Route path="/apartments" render={() => (
                        <App />
                    )} />
                    <Route path="/gob" render={() => (
                        <PostApartment />
                    )} />
                    <Route path="/sublets" render={() => (
                        <App />
                    )} />
                    <Route path="/post" component={UniqueApartment} />
                    <Route path="/inbox" component={Inbox} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/my-posts" component={MySubletPosts} />
                    <Route path="/privacy-policy" component={PrivacyPolicy} />
                    <Route path="/contact" component={Contact} />
                </Router >

            )

        }
        // Not signed in

    }
}



