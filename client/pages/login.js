import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";

const Login = () => {
  const [email, setEmail] = useState("gj@gmail.com");
  const [password, setPassword] = useState("heythere");
  const [loading, setLoading] = useState(false);

  // state access
  const { state, dispatch } = useContext(Context);

  console.log(state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));

      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="p-5 mb-4 jumbotron text-center square">Login</h1>

      <div className="container col-md-4 offset-md-4 pd-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            className="form-control mb-4 p-4"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Enter Password"
            required
          />
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
          <p className="text-center p-3">
            Not yet Registered? <Link href="./register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
