import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("GJ");
  const [email, setEmail] = useState("gj@gmail.com");
  const [password, setPassword] = useState("heythere");
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const { user } = state;

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      toast.success("Registration successful. Please Login");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="p-5 mb-4 jumbotron text-center square">Register</h1>

      <div className="container col-md-4 offset-md-4 pd-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="Enter name"
            required
          />
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
              disabled={!name || !email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
          <p className="text-center p-3">
            Already Registered? <Link href="./login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
