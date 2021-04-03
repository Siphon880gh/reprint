import React from 'react';
import { Container } from 'react-bootstrap';
/* import { useQuery } from '@apollo/react-hooks'; // TO REVIEW
import { GET_ME } from '../utils/queries'; */
import { useParams } from "react-router-dom";



const Profile = () => {
    let { id } = useParams();

    return (
        <div>
            <h2>This is the profile?</h2>
        </div>
    );
};

export default Profile;