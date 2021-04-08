import React from 'react';
import { Card, Button, CardColumns, Container } from 'react-bootstrap';
import { GET_STREAM } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import LikeIcon from '../assets/likeArrowBoxIcon.png';
import CommentIcon from '../assets/commentIconBox.png';

export function Home() {
  const { loading, data } = useQuery(GET_STREAM);
  const streamnofts = data?.stream || [];

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
    a.href=blobUrl;
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
              <Card key={reprint._id} style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title ><Card.Link href={`/post/${reprint._id}`}>{reprint.title}</Card.Link></Card.Title>
                  <Card.Img variant="top" src={reprint.asset} />
                  <Card.Text><img src={LikeIcon}
                    width="25"
                    height="25"
                    alt="Noft Custom Icon" />{reprint.likeCount}<img src={CommentIcon}
                      width="25"
                      height="25"
                      alt="Noft Custom Icon" />{reprint.commentCount}</Card.Text>
                  <Card.Text>NoFT Author: <Card.Link href={`/profile/${reprint.author}`}>{reprint.author}</Card.Link> </Card.Text>
                  <Button onClick={openBloblUrl} data-asset-url={reprint.asset} data-asset-filename={trimFilename(reprint.asset)} variant="primary">Download</Button>
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
