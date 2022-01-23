import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { FETCH_POST } from "../components/pages/Home";

const PostForm = () => {
  const [values, setValues] = useState({ body: "" });
  const [createPostCallback, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POST,
      });
      proxy.writeQuery({
        query: FETCH_POST,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
  });
  function onSubmit(e) {
    e.preventDefault();
    createPostCallback();
  }
  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  return (
    <Form onSubmit={onSubmit}>
      {error && <h1>{(error.message, error.name, error.stack)}</h1>}
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="post..."
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
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
        id
        createdAt
        username
      }
      commentCount
      likeCount
    }
  }
`;

export default PostForm;
