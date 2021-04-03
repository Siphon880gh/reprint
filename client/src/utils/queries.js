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

export const GET_ME = gql`
query {
  me {
    _id
    username
    followerCount
    followedCount
    reprints {
      _id
    title
    asset
    author
    likeCount
    commentCount
    }
  }
}`;

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

export const GET_SINGLE_CARD = gql`
query {
  reprint(title: $title){
    _id
    title
    asset
    author
    likeCount
    commentCount
  }
}`;