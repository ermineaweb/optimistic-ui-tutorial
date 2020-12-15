import React from "react";
import ApolloClientProvider from "./ApolloClientProvider";
import UsersWithoutOptimistic from "./UsersWithoutOptimistic";
import UsersWithOptimistic from "./UsersWithOptimistic";

function App() {
  return (
    <ApolloClientProvider>
      <main>
        <UsersWithoutOptimistic />
        <UsersWithOptimistic />
      </main>
    </ApolloClientProvider>
  );
}

export default App;
