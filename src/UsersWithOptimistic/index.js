import React from "react";
import { useQuery } from "@apollo/client";
import Users from "./Users";
import { queryRequest } from "../graphql";

function UsersWithData() {
  const { data, loading } = useQuery(queryRequest);

  if (loading)
    return (
      <main>
        <div>loading...</div>
      </main>
    );

  return <Users users={data.users} />;
}

export default UsersWithData;
