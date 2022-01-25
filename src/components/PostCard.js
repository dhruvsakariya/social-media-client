import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
const PostCard = (props) => {
  const { user } = useContext(AuthContext);
  const { body, createdAt, id, username, likeCount, commentCount, likes } =
    props.post;

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          circular
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton likeCount={likeCount} likes={likes} id={id} user={user} />
        <Popup
          content="Comment on Post"
          inverted
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button basic color="blue">
                <Icon name="comments" />
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
