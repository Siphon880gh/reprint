import React, {useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Modal, Container, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER, GET_ME } from '../utils/queries';
import { FOLLOW, UNFOLLOW, DELETE_USER_V2 } from '../utils/mutations';

import LikeIcon from '../assets/likeArrowBoxIcon.png';
import CommentIcon from '../assets/commentIconBox.png';
import Auth from '../utils/auth';

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
    const [amIAFollower, updateFollowStatus] = useState(theirFollowers.includes(Auth.getProfile().data._id));
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
                <button className="follow-btn" onClick={handleFollow}>
                    Follow
                </button>);
        }
    } // RenderFollowButton

    return (
        <>
        {loadingTheirUserInfo?(<div>Loading...</div>):
        (
            <Container>
            {/* {console.log(userParam)}
            {console.log(user)}
            {console.log(data)} */}
            <div >
                <h2>
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                </h2>

            </div>
            <p>Followers: {user.followerCount}</p>
            <p>Followed: {user.followedCount}</p>
            <p>Total Reprints: {user.reprintCount}</p>
            <p>Total Favorite Counts: {user.favoriteCount}</p>


            { Auth.loggedIn() && userParam && (
                <RenderFollowButton/>
                
            )}

            <h2>{user.username}'s Reprints:</h2>
            {user.reprints.map((userReprint, itrIndex) => {
                return (
                    <Card key={userReprint._id} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title ><Card.Link href={`/post/${userReprint._id}`}>{userReprint.title}</Card.Link></Card.Title>
                            <Card.Img variant="top" src={userReprint.asset} />
                            <Card.Text><img src={LikeIcon}
                                width="25"
                                height="25"
                                alt="Noft Custom Icon" />{userReprint.likeCount}<img src={CommentIcon}
                                    width="25"
                                    height="25"
                                    alt="Noft Custom Icon" />{userReprint.commentCount}</Card.Text>
                            <Card.Text>NoFT Author: <Card.Link href={`/profile/${userReprint.author}`}>{userReprint.author}</Card.Link> </Card.Text>
                            <Button onClick={openBloblUrl} data-asset-url={userReprint.asset} data-asset-filename={trimFilename(userReprint.asset)} variant="primary">Download</Button>
                        </Card.Body>
                    </Card>
                );
            })}

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

        </Container>

        )}
        </>
    )
};

export default Profile;