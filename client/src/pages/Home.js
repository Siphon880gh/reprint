import React from 'react';
import { Card, Button, CardColumns, Container } from 'react-bootstrap';
import { GET_STREAM } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
/* import NoftCard from '../components/NoftCard';
 */
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
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{reprint.title}</Card.Title>
                  <Card.Img variant="top" src={reprint.asset} />
                  <Card.Text><Card.Link href="#"><span role="img" aria-label="like emoji">👍</span>{reprint.likeCount}</Card.Link><Card.Link href="#"><span role="img" aria-label="comment emoji" >💬</span>{reprint.commentCount}</Card.Link></Card.Text>
                  <Card.Text>NoFT Author: <Card.Link href="#">{reprint.author}</Card.Link> </Card.Text>
                  <Button variant="primary">Download</Button>
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

export default Home;
