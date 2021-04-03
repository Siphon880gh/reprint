import gql from 'graphql-tag';

// TODO: Add more graphQL executions on the client UI side. 
// Try the query/mutations at http://localhost:3001/graphql before adding them here.

export const TRENDING_REPRINTS = gql`
query {
  trending {
    _id
    asset
  }
}`;


/* export const GET_ME = gql`
query {
  me {
    _id
    username
    email
    reprints {
              _id
              title
              asset
              author
              caption
             likes {
             username
                  }
    likeCount
    comments {
      _id
    commentBody
    author
    }
    favorites {
      _id
    title
    asset
    author
    caption
    }
    followers {
      _id
      username
    }
    followed {
      _id
    username
    }
}`; */

export const GET_STREAM = gql`
query {
  stream {
    _id
    title
    asset
    author
    likeCount
    commentCount 
  }
}`;



