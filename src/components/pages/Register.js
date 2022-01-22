import { gql, useMutation } from "@apollo/client";
import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const Register = () => {
  const authContext = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const history = useHistory();

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log(userData);
      authContext.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.errors
          : {}
      );
    },
    variables: {
      registerInput: values,
    },
  });
  function onSubmit(e) {
    e.preventDefault();
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          type="password"
          placeholder="Password"
          error={errors.password ? true : false}
          name="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword ? true : false}
          placeholder="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation Register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Register;
