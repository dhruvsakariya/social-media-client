import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import { Loader } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const history = useHistory();
  const postId = props.match.params.postId;
  // console.log(postId);

  const [comment, setcomment] = useState("");

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setcomment("");
      commentInputRef.current.blur();
    },
    variables: { postId, body: comment },
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
      comments,
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
            {user && (
              <Card fluid>
                <Card.Content>
                  <b className="">Post a comment:</b>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="comment..."
                        name="comment"
                        autoFocus
                        value={comment}
                        autoComplete="off"
                        onChange={(event) => setcomment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={createComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
};
const CREATE_COMMENT = gql`
  mutation CreateComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      createdAt
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

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
