import { useState } from "react";
import loginImage from "./login.jpg";

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    onLogin({ name, email });
  };

  return (
    <div className="login-container">
      {/* Left side: image */}
      <div className="login-image">
        {/* <img src={loginImage} alt="Login" /> */}
      </div>

      {/* Right side: form */}
      <div className="login-form">
        <div className="form-box">
          <h2>Welcome Back!</h2>
          <p>Please login to continue</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
