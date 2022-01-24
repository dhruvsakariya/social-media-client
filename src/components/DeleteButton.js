import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";

const DeleteButton = ({ postId }) => {
  const [confirm, setconfirm] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    update() {
      setconfirm(false);
      // TODO: remove post from cache
    },
    variables: { postId },
  });
  return (
    <>
      <Button as={"div"} floated="right" onClick={() => setconfirm(true)}>
        <Icon name="trash" color="red" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirm}
        onCancel={() => setconfirm(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
