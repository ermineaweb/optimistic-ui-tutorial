import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { mutationRequest, queryRequest } from "../graphql";

function Users({ users }) {
  const [username, setUsername] = useState("");
  const [createUser] = useMutation(mutationRequest);

  const handleCreateUser = () => {
    createUser({
      variables: { username },
      refetchQueries: [{ query: queryRequest }],
    }).catch((err) => err);
    setUsername("");
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <h2>Without Optimistic</h2>
      Username :
      <input type={"text"} value={username} onChange={changeUsername} />
      <button onClick={handleCreateUser}>add</button>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.username}</div>
          <button>X</button>
        </div>
      ))}
    </div>
  );
}

export default Users;
