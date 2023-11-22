import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";

const UserIndex = () => {
  const [hidden, setHidden] = useState(true);

  const {
    state: { user },
  } = useContext(Context);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {!hidden && (
        <h1 className="p-5 mb-4 jumbotron text-center square">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )}
    </>
  );
};

export default UserIndex;
