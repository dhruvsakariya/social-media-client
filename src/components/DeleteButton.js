import React from "react";
import { Button, Icon } from "semantic-ui-react";

const DeleteButton = ({ postId }) => {
  return (
    <Button
      as={"div"}
      floated="right"
      onClick={() => console.log("Delete Post")}
    >
      <Icon name="trash" color="red" style={{ margin: 0 }} />
    </Button>
  );
};

export default DeleteButton;
