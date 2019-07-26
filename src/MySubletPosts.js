import React from 'react';
import * as firebase from 'firebase';
import Button from 'react-bootstrap/Button';
import logo from './Texas_Longhorns_logo.svg';



export default class MySubletPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
        }

        const temp = [];
        const a = firebase.firestore().collection("Austin").doc("University of Texas at Austin").collection("Sublets").where("uid", "==", firebase.auth().currentUser.uid.toString()).get().then(post => {

            if (post != null && post.empty != true && post.size != 0) {
                const b = post.forEach(doc => {

                    temp.push(doc.data());
                    return temp;

                })
                this.setState({
                    posts: temp[0],
                })

            } else {
                return <h1>No posts made. Click "Post an apartment" to post your apartment for sublease!</h1>
            }
        })
    }


    deletePost() {
        firebase.firestore().collection("Austin").doc("University of Texas at Austin").collection("Sublets").doc(this.state.posts.uniqueId.toString()).delete().then(() => {
            alert('Delete successful! Feel free to post again.')
            document.location.reload();
        }).catch(() => {
            alert('Delete unsuccessful. Try again.')
        })
    }



    render() {
        if (this.state.posts == null) {
            return <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                <div class="header-banner" style={{ position: "relative" }}>
                    <div class="div-logo">
                        <a href="/sublets">
                            <img src={logo} class="logo-img" id="zzzzz" />
                        </a>
                    </div>

                </div>
                <div>
                    <h1>No posts made</h1>
                </div>

            </div>
        } else {
            console.log(this.state.posts)
            return (
                <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                    <div class="header-banner" style={{ position: "relative" }}>
                        <div class="div-logo">
                            <a href="/sublets">
                                <img src={logo} class="logo-img" id="zzzzz" />
                            </a>
                        </div>

                    </div>

                    <h1>You have made a post. What would you like to do?</h1>
                    <Button variant="primary" size="lg" onClick={() => window.location.href = "/post/" + this.state.posts.uniqueId}>
                        View your post
                    </Button>
                    <Button variant="primary" size="lg" style={{ backgroundColor: "red" }} onClick={() => this.deletePost()}>
                        Delete your post
                    </Button>
                </div>
            )
        }

    }
}