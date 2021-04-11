import React, {useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Modal, Container, Card, CardColumns, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER, GET_ME } from '../utils/queries';
import { FOLLOW, UNFOLLOW, DELETE_USER_V2 } from '../utils/mutations';

import LikeIcon from '../assets/likeArrowBoxIcon.png';
import CommentIcon from '../assets/commentIconBox.png';
import Auth from '../utils/auth';

import PostCard from "../components/PostCard";
import "./Profile.css";

const Profile = props => {
    function unsignToken() {
        Auth.logout();
    }
    async function openBloblUrl(e) {

        let assetUrl = e.target.getAttribute("data-asset-url");
        let downloadFilename = e.target.getAttribute("data-asset-filename");

        async function innerClosure() {
            let response = await fetch(assetUrl);
            let blob = await response.blob(); // download as Blob object
            let blobUrl = await window.URL.createObjectURL(blob);
            return blobUrl;
        }

        let blobUrl = await innerClosure();

        var forcer = document.querySelector("#force-download");
        forcer.innerHTML = "";
        var a = document.createElement("a");
        a.href = blobUrl;
        a.setAttribute("download", downloadFilename);
        forcer.appendChild(a);
        a.click();

        return blobUrl;

    } // openBloblUrl

    function trimFilename(url) {
        let dropRight = url.indexOf("?alt");
        url = url.substr(0, dropRight);
        let dropLeft = url.indexOf("/o/") + 3;
        url = url.substr(dropLeft);
        return url;
    }

    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
        variables: { username: userParam }
    });

    // GraphQL profile information requests
    const { loading: loadingTheirUserInfo, data: theirUserInfo } = useQuery(GET_USER, {
        variables: { username: userParam?userParam:"" }
    });
    const theirFollowers = theirUserInfo?.author?.followers || [];
    const [amIAFollower, updateFollowStatus] = useState(theirFollowers && Auth.getProfile() ? theirFollowers.includes(Auth.getProfile().data._id) : {});
    const [showDeleteMeModal, setShowDeleteMeModal] = useState(false);

    const user = data?.me || data?.author || {};
    const [follow] = useMutation(FOLLOW);
    const [unfollow] = useMutation(UNFOLLOW);
    const [deleteMe] = useMutation(DELETE_USER_V2);

    // In the case you deleted your profile or the user doesnt exist
    // if(typeof user==="undefined" || Object.keys(user).length === 0) {
    if(!user) {
        return <Redirect to="/" />;
    }

    // redirect to personal profile page if username is yours
    if (
        Auth.loggedIn() &&
        Auth.getProfile().data.username === userParam
    ) {
        return <Redirect to="/profile" />;
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    const handleFollow = async () => {
        if (amIAFollower) {
            try {
                await unfollow({
                    variables: { followedId: user._id }
                });
                updateFollowStatus(false);
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                await follow({
                    variables: { followedId: user._id }
                });
                updateFollowStatus(true);
            } catch (e) {
                console.error(e);
            }
        }
    };

    function RenderFollowButton() {
        if(amIAFollower) {
            return (
            <button className="follow-btn" onClick={handleFollow}>
                Unfollow
            </button>); 
        } else {
            return (
                <button className="btn btn-primary follow-btn" onClick={handleFollow}>
                    Follow
                </button>);
        }
    } // RenderFollowButton

    return (
        <>
        {loadingTheirUserInfo?(<div>Loading...</div>):
        (
            <Container className="profile">
                    <Card className="profile-stats">
                        <div className="pt-3">
                            <h1>
                                Viewing {userParam ? `${user.username}'s` : 'your'} profile
                            </h1>

                        </div>
                        <div className="p-2">
                            <p>Followers: {user.followerCount}</p>
                            <p>Followed: {user.followedCount}</p>
                            <p>Total Reprints: {user.reprintCount}</p>
                            <p>Total Favorite Counts: {user.favoriteCount}</p>
                        </div>

                        { Auth.loggedIn() && userParam && (
                            <RenderFollowButton/>
                            
                        )}
                        
                        <div className="your-reprints">
                            <h2 className="pt-3 pb-3 pl-0 ml-0">Your NoFTs:</h2>
                            <CardColumns>
                            {user.reprints.map((userReprint, itrIndex) => {
                                return (
                                    <PostCard key={userReprint._id} postcard={userReprint}></PostCard>
                                );
                            })}
                            </CardColumns>
                        </div>

                        {
                            Auth.loggedIn() && !userParam &&
                            (
                                <>
                                    <div className="mt-5 float-right">
                                        <Button onClick={()=> setShowDeleteMeModal(true) } variant="warning">Delete Me</Button>
                                    </div>
                                    <div className="clearfix"/>
                                </>
                            )
                        }

                        <Modal
                            size='lg'
                            show={showDeleteMeModal}
                            onHide={() => setShowDeleteMeModal(false)}
                            aria-labelledby='delete-me-modal'>
                            {/* tab container to do either signup or login component */}
                            <Modal.Header closeButton>
                                <Modal.Title id='delete-me-modal'>
                                    Account Removal
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="text-center pt-3 pb-3">Delete your account? This cannot be reversed.</p>
                                <Button className="float-right" onClick={()=> setShowDeleteMeModal(false) } variant="light">Cancel</Button>
                                <div className="float-right" style={{width:"25px"}}>&nbsp;</div>
                                <Button className="float-right" onClick={()=> { 
                                    // Deleting User Profile:

                                    // Revoke on the backend
                                    const deleted = deleteMe();
                                    
                                    // Revoke on the frontend
                                    if(deleted) 
                                        setTimeout(Auth.permanentlyRevoke, 1000);
                                }} variant="danger">Delete</Button>
                            </Modal.Body>
                        </Modal>
                </Card>
        </Container>
        )}
        </>
    )
};

export default Profile;