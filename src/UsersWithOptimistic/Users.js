import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { mutationRequest, queryRequest } from "../graphql";

function Users({ users }) {
  const [username, setUsername] = useState("");
  const [createUser] = useMutation(mutationRequest);

  const handleCreateUser = () => {
    createUser({
      variables: { username },
      optimisticResponse: {
        __typename: "Mutation",
        createUser: { __typename: "User", id: 123456, username }, // Fake temporary Id, you can take the uuid library
      },
      update: (proxy, { data: { createUser } }) => {
        // Get the data from GraphQL cache
        const data = proxy.readQuery({ query: queryRequest });
        // Update the cache with the query
        proxy.writeQuery({
          query: queryRequest,
          data: { ...data, users: [...data.users, createUser] },
        });
      },
    }).catch((err) => err);
    setUsername("");
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <h2>Optimistic</h2>
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
