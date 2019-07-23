import React from 'react';
import Button from 'react-bootstrap/Button';
import * as firebase from 'firebase';



export default class Feedback extends React.Component {


    sendUpdate() {
        firebase.firestore().collection("feedback").doc().set({
            msg: document.getElementById('feedback-id').value,
        }).then(() => {
            alert('feedback successful')
        }).catch(() => {
            alert('feedback failed. Try again.')
        })
    }



    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>Please let me know what to improve on!</h3>
                <br></br>
                I will be constantly updating the website, but your feedback is immensly helpful in knowing what to build or prioritize.
                <br />
                <br />
                This is also where you can just tell me you have lost your password or email, and I can give you the other piece!
                <br />
                <textarea style={{ height: "60vh", width: "60vw" }} id="feedback-id"></textarea>
                <Button onClick={() => this.sendUpdate()}>Submit!</Button>
            </div>

        )
    }
}