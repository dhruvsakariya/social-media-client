import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POST } from "../components/pages/Home";

const DeleteButton = ({ postId, callback }) => {
  const [confirm, setconfirm] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy, response) {
      setconfirm(false);
      const data = proxy.readQuery({
        query: FETCH_POST,
      });
      response = data.getPosts.filter((p) => p.id !== postId);
      proxy.writeQuery({ query: FETCH_POST, data: { getPosts: response } });
      if (callback) callback();
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
