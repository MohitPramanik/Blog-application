import { Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router";
import * as z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/features/auth/authSlice";
import { useSignupMutation } from "../../store/services/authApi";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();

  const signupSchema = z.object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email"
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters"),
    confirmPassword: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(signupSchema), })

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    try {
      const result = await signup({
        username: data.username,
        email: data.email,
        password: data.password
      }).unwrap();

      dispatch(setCredentials({token: result.token}));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary-subtle min-vh-100">
      <Container className="py-4">
        <Card className="p-4 w-100 mx-auto" style={{ maxWidth: "30rem" }}>

          <h1 className="text-center">Create Account</h1>
          <Form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Choose a username" {...register("username")} />
              {<small className="text-danger">{errors.username?.message}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" {...register("email")} />
              {<small className="text-danger">{errors.email?.message}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <div className="position-relative d-flex align-items-center">
                <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter your Password" {...register("password")} />
                <button type="button"
                  className="btn position-absolute end-0 fs-5 toggle-password-btn"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </button>
              </div>
              {<small className="text-danger">{errors.password?.message}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="position-relative d-flex align-items-center">
                <Form.Control type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your Password" {...register("confirmPassword")} />
                <button type="button"
                  className="btn position-absolute end-0 fs-5 toggle-password-btn"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                >
                  {showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </button>
              </div>
              {<small className="text-danger">{errors.confirmPassword?.message}</small>}
            </Form.Group>

            <Button type="submit" variant="primary">Sign Up</Button>
          </Form>

          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="px-3">OR</span>
            <hr className="flex-grow-1" />
          </div>


          <div className="d-flex flex-column gap-1">
            <Button variant="outline-dark" className="d-flex align-items-center gap-2 justify-content-center">
              <img src="/google.png" alt="Google icon" style={{ height: "1rem" }} />
              Sign up with Google
            </Button>
            <Button variant="outline-dark" className="d-flex align-items-center gap-2 justify-content-center">
              <img src="/facebook.png" alt="Facebook icon" style={{ height: "1rem" }} />
              Sign up with Facebook
            </Button>
          </div>

          <small className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </small>
        </Card>
      </Container>
    </div>
  )
}
