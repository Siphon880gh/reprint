import React from 'react';
import { Container } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks'; // TO REVIEW
import { GET_ME } from '../utils/queries';

const Profile = () => {
    const { data } = useQuery(GET_ME);
    const me = data.me
    console.log({ data })
    return (<React.Fragment>
        <Container>
            <h2>
                User Profile
        </h2>
            <p>Username: {me.username} </p>
            <p>Email: {me.email} </p>

            <p>RePrints?</p>


        </Container>
    </React.Fragment>);
};

export default Profile;