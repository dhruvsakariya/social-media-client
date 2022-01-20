import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import PostCard from "../../components/PostCard";
const Home = () => {
  const { data, loading, error } = useQuery(FETCH_POST);

  return (
    <div>
      <div>{error ? <h1>Error </h1> : ""}</div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1> </h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 30 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

const FETCH_POST = gql`
  query GetPosts {
    getPosts {
      id
      body
      commentCount
      likeCount
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        username
      }
    }
  }
`;

export default Home;
