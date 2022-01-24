import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid, Loader, Transition } from "semantic-ui-react";
import PostForm from "../../components/PostForm";
import PostCard from "../../components/PostCard";
import { AuthContext } from "../../context/auth";
const Home = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useQuery(FETCH_POST);

  return (
    <div>
      <div>{error ? <h1>Error </h1> : ""}</div>
      {loading ? <Loader active /> : ""}
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1> </h1>
          ) : (
            <Transition.Group>
              {data.getPosts &&
                data.getPosts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 30 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export const FETCH_POST = gql`
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
