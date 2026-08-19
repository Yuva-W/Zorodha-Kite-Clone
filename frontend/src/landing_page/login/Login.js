import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:3002/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      // Dashboard is a separate app on a different port,
      // so localStorage is NOT shared (origins differ).
      // Pass the token through the URL once; the dashboard
      // stores it in its own localStorage and redirects.
      window.location.href =
        `http://localhost:3001/login?token=${res.data.token}`;

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="auth-page d-flex justify-content-center align-items-center"
    >
      <Row>
        <Col md={12}>
          <Card className="auth-card">
            <Card.Body className="p-5">
              <h1 className="text-center mb-1">Welcome Back</h1>

              <p className="text-center text-muted mb-4">
                Login to your TradePro account
              </p>

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {error && (
                  <Alert variant="danger" className="py-2">
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>

              <p className="text-center mt-4 mb-0">
                Don't have an account?{" "}
                <Link to="/signup">
                  Sign Up
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;