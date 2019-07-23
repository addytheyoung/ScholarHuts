import React from 'react';



export default class Help extends React.Component {



    render() {
        return (
            <div>
                <a href="/feedback" target="_blank">
                    <h3>Feedback</h3>
                </a>

                <a href="/my-posts">
                    <h3>Manage Posts</h3>
                </a>

                <a href="/privacy-policy">
                    <h3>Privacy Policy</h3>
                </a>
                <a href="/contact">
                    <h3>Contact</h3>
                </a>



            </div>
        )
    }
}