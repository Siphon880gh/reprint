import React from 'react';
import { Card, Button, CardColumns, Container } from 'react-bootstrap';
import { GET_STREAM } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import PostCard from "../components/PostCard";

export function Home() {
  const { loading, data } = useQuery(GET_STREAM);
  const streamnofts = data?.stream || [];

  return (<React.Fragment>
    {loading ? (
      <div>Loading...</div>
      // TODO: We can add a spinner here
    ) : (
      <Container>
        <h2>
          {streamnofts.length
            ? ``
            : 'No trending NoFTs found. Is this a fresh install? Try seeding the database.'}
        </h2>
        <CardColumns>
          {streamnofts.map((reprint, itrIndex) => {
            return (
              <PostCard key={reprint._id} postcard={reprint}></PostCard>
            );
          })}
        </CardColumns>

      </Container>
    )
    }
  </React.Fragment>);
};

export default Home;
