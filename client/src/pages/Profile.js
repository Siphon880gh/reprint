import React from 'react';
import { Container } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks'; // TO REVIEW
import { GET_ME } from '../utils/queries';
import { useParams } from "react-router-dom";



const Profile = () => {
    let { id } = useParams();
    const { data } = useQuery(GET_ME);
    let me;

    if (data) {
        me = data.me;
    }

    return (
        <>
            <div>

                {me ? (
                    <>
                        <h2>Profile For {me.username}</h2>
                        <p>Followers: {me.followerCount}</p>
                        <p>Followed: {me.followedCount}</p>
                        <p>Likes:{me.likeCount}</p>
                        <p>Comments:{me.commentCount}</p>
                    </>
                ) : null}

            </div>

        </>)

};
export default Profile;