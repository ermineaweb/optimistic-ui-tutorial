// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// NOT PRODUCTION READY JUST FOR DEMONSTRATION
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const express = require("express");
const path = require("path");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

const port = 5000;
const app = express();
app.use(cors());

// Some default users
const users = [
  { id: 4578, username: "Hermione" },
  { id: 7458, username: "Harry" },
  { id: 98566, username: "Ron" },
];

// Graphql schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(username: String!): User
  }
`;

// Graphql resolvers
const resolvers = {
  User: {
    id: (parent) => parent.id,
    username: (parent) => parent.username,
  },
  Query: {
    users: () => users,
  },
  Mutation: {
    // fast fake id
    createUser: (parent, { username }) => {
      const newUser = {
        id: Math.floor(Math.random() * Math.floor(10000)),
        username,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

// Add some big Lag
app.use((req, res, next) => {
  setTimeout(() => next(), 2000);
});

// Apollo Graphql Server
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Static server for React files
app.use(express.static(path.resolve("./build")));
app.use("/", (req, res) => res.sendFile(path.resolve("./build/index.html")));

// Start
app.listen(port, () => {
  console.log(`graphql server start on ${port}`);
});
