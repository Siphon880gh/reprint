import React from 'react';
import { Container } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks'; // TO REVIEW
import { GET_ME } from '../utils/queries';
import { useParams } from "react-router-dom";

const Profile = () => {
    const { data } = useQuery(GET_ME);

    return (
        <>
            <div>

                <h2>Profile Time!</h2>



                {data ? (
                    <>
                        <h2> {data.username} {data.email}</h2>

                    </>
                ) : null}

            </div>

        </>)

};

export default Profile;