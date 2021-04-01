import React from 'react';
// import React, { useState, useEffect } from 'react';
// TO DO: need to update this with the query for user favorites and map through the assets, same logic as the home page basically?]
import { Container, Card, CardColumns } from 'react-bootstrap';

import { useQuery } from '@apollo/react-hooks'; // TO REVIEW
import { TRENDING_REPRINTS } from '../utils/queries';

const Favorites = () => {

    // use useQuery hook to make query request
    const { loading, data } = useQuery(TRENDING_REPRINTS);
    const reprints = data?.trending || [];
    console.log({ data })

    return (<React.Fragment>
        {loading ? (
            <div>Loading...</div>
            // TODO: We can add a spinner here
        ) : (
            <Container>
                <h2>
                    {reprints.length
                        ? `Your Favorite Reprints:`
                        : 'No favorite Reprints found. Is this a fresh install? Try seeding the database.'}
                </h2>
                <CardColumns>
                    {reprints.map((reprint, itrIndex) => {
                        return (
                            <Card key={itrIndex} border='dark'>
                                <Card.Body>
                                    <Card.Img variant="top" src={reprint.asset} />
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        )
        }
    </React.Fragment>);
};

export default Favorites;