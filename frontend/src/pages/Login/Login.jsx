import "./Login.css";
import { useState } from "react";
import Images from "../../assets/Image-container";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setNotes }) => {
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("Sign Up");

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = currState === "Login" ? "login" : "register";
      const response = await axios.post(
        `http://localhost:3000/api/auth/${endpoint}`,
        formData,
      );

      console.log(response);

      const resNotes = await axios.get("http://localhost:3000/api/notes/get");

      setNotes(resNotes.data.notes);

      navigate("/");
      alert(response.data.message || "Form submitted successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message || "An error occurred during submission.",
      );
    }
  };

  return (
    <div className="login">
      <img src={Images.greet} alt="Greeting" />
      <form onSubmit={handleSubmit} className="login-form">
        <h1>{currState === "Login" ? "Login" : "Sign Up"}</h1>

        {currState === "Sign Up" && (
          <>
            <input
              className="form-input"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleOnChange}
              placeholder="Full Name"
              required
            />
            <input
              className="form-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder="Username"
              required
            />
          </>
        )}

        <input
          className="form-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          placeholder="Email"
          required
        />

        <input
          className="form-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleOnChange}
          placeholder="Password"
          required
        />
        <button type="submit">
          {currState === "Login" ? "Login Now" : "Create Account"}
        </button>

        <div className="login-term">
          <input type="checkbox" required />
          <p htmlFor="terms">I agree to the terms and conditions</p>
        </div>

        <div className="login-forgot">
          {currState === "Login" ? (
            <p className="login-toggle">
              Don't have an account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Sign Up</span>
            </p>
          ) : (
            <p className="login-toggle">
              Already have an account?
              <span onClick={() => setCurrState("Login")}> Login</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
