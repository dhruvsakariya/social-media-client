import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const postId = props.match.params.postId;
  // console.log(postId);
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  function deletePostCallBack() {
    history.push("/");
  }

  let postMarkup;
  if (!data) {
    postMarkup = <Loader active />;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      // comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              floated="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
                  user={user}
                  likeCount={likeCount}
                  likes={likes}
                  id={id}
                />
                <Button
                  as={"div"}
                  labelPosition="right"
                  onClick={() => console.log("commento on post")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallBack} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query Query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
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
        createdAt
        id
      }
      commentCount
      likeCount
    }
  }
`;

export default SinglePost;
