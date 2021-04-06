// Create a skeletal structure of what our addPost page will look like
// Set up imports at the top
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'
// Generate random hash for filenames
import generateHash from 'random-hash';
import process from "process";
// import auth
import Auth from "../utils/auth";

let signedIn = false;

// This is the Upload Form Component
export default function UploadForm(props) {

    const firebaseConfig = Auth.getGoogleStorage()

    // Initialize Firebase
    if (!firebase.apps.length) {
        try {
            firebase.initializeApp(firebaseConfig)
        } catch (err) {
            console.error("Firebase initialization error raised", err.stack)
        }
    }

    if (!signedIn) {

        const firebaseAuthDetails = Auth.getGoogleAuth()

        firebase.auth().signInWithEmailAndPassword(...firebaseAuthDetails)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                throw JSON.stringify({ errorCode, errorMessage });
            });
        signedIn = true;
    }

    // Get a reference to the storage service, which is used to create references in your storage bucket
    const uniqueFilename = Math.floor(new Date().getTime()) + generateHash({ length: 6 });

    const storageRef = firebase.storage().ref().child(uniqueFilename);

    // State to keep track of selected file
    const initialState = {
        // Initial: No file selected
        selectedFile: null,
        title:"",
        market:"",
        caption:""
    }

    const [state, setState] = useState(initialState);

    // On input changes, update state
    const onFileChange = event => {
        setState({ 
            ...state,
            selectedFile: event.target.files[0] 
        });
    };
    const onTitleChange = (event) => {
        setState({ 
            ...state,
            title: event.target.value
        });
    };
    const onMarketChange = (event) => {
        setState({ 
            ...state,
            market: event.target.value
        });
    };
    const onCaptionChange = (event) => {
        setState({ 
            ...state,
            caption: event.target.value
        });
    };


    // On submit, send state to models and cloud server
    const onPostSubmit = async () => {

        // Step 1: Send file to cloud
        async function sendToCloud() {
            // Create formData data from state to be sent to cloud server
            const formData = new FormData();

            formData.append(
                "myFile",
                state.selectedFile,
                state.selectedFile.name
            );

            console.log(state.selectedFile);

            return await storageRef.put(state.selectedFile)
                .then((snapshot) => {
                    console.log("Uploading started");
                    return snapshot.ref.getDownloadURL();
                }).then(downloadURL => {
                    console.log('Uploaded:');
                    console.log({ asset: downloadURL });

                    return downloadURL;
                })
                .catch(error => {
                    throw error;
                });
        }

        const downloadURL = await sendToCloud();
        console.log("Awaited downloadURL:", downloadURL);
        //TODO: Send downloadURL to mongoose, probably using a mutation


    }; // onPostSubmit

    // Display image after file upload completes
    const fileData = () => {
        if (state.selectedFile) {
            return (
                <div>

                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Text>Filename: {state.selectedFile.name} </Card.Text>
                            <Card.Text>File Type: {state.selectedFile.type} </Card.Text>
                            <Card.Text>Last Modified: {" "} {state.selectedFile.lastModifiedDate.toDateString()} </Card.Text>
                        </Card.Body>
                    </Card>
                    {/* <p> Filename: { state.selectedFile.name } </p>


                    <p> File Type: { state.selectedFile.type } </p>


                    <p>Last Modified: { " " } { state.selectedFile.lastModifiedDate.toDateString() } </p> */}

                    <h2> Image Selected from computer: </h2>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4> Choose file, then upload! </h4>
                </div>
            );
        }
    }; // Form Data

    // Return JSX
    return ( <div>
        
            <div>
                <h1>Post A Reprint</h1>
            </div>

            <Form>
                {/* Choose File Button */}
                <Form.Group>
                    <input type="file" onChange={onFileChange} accept="image/*" />

                    <aside>
                        {fileData()}
                    </aside>
                </Form.Group>

                {/* Add A Title */}
                <Form.Group controlId="titleInput">
                    <Form.Label>Add A Title:</Form.Label>
                    <Form.Control onInput={onTitleChange} />
                </Form.Group>

                {/* Add Market Listing */}
                <Form.Group controlId="marketListing">
                    <Form.Label>Add Market Listing:</Form.Label>
                    <Form.Control placeholder="https://www.example.com/" onInput={onMarketChange} />
                </Form.Group>


                {/* Captions */}
                <Form.Group controlId="captionInput">
                    <Form.Label>Add A Caption:</Form.Label>
                    <Form.Control as="textarea" placeholder="Optional: Add a caption!" rows={3} onInput={onCaptionChange} />
                </Form.Group>

                {/* Submit */}
                <Button variant="primary" onClick={onPostSubmit}> Upload! </Button>
                {/* <Button variant="primary" type="submit">
                    Post
                </Button> */}

                <article>
                    <h2> Debug Form State: </h2>
                    <div><label>Title:</label><span>{state.title}</span></div>
                    <div><label>Market:</label><span>{state.market}</span></div>
                    <div><label>Caption:</label><span>{state.caption}</span></div>
                    {/* <p> {process.env.GOOGLE_APPLICATION_CREDENTIALS} </p> */}
                </article>
            </Form>
        </div>
    )
}

// Export addPost
// export default postForm;
