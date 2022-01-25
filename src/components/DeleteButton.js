import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POST } from "../components/pages/Home";

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirm, setconfirm] = useState(false);
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [deletePostorMutation] = useMutation(mutation, {
    update(proxy, response) {
      setconfirm(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POST,
        });
        response = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POST, data: { getPosts: response } });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <Button
        as={"div"}
        floated="right"
        style={{ marginTop: commentId ? 10 : 0 }}
        onClick={() => setconfirm(true)}
      >
        <Icon name="trash" color="red" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirm}
        onCancel={() => setconfirm(false)}
        onConfirm={deletePostorMutation}
      />
    </>
  );
};

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
