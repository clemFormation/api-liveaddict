import {Router} from 'express';
import { GraphQLSchema } from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import models from '#root/lib/DAL/index.js';

const router = new Router();

router.use((req,res) =>{
  res.headers.push({
    "Access-Control-Allow-Origin" : "*",
  })
})

// génération automatic de tous les models en schema graphQL
import graphMod from 'graphcraft' //https://github.com/almost-full-stack/graphcraft

const options = {
  //exclude: ["Users"]
}
const {generateModelTypes, generateSchema} = graphMod(options);
const schema = await generateSchema(models) // Generates the schema, return promise.

router.use('/', graphqlHTTP({
    schema: new GraphQLSchema(schema),
    graphiql: true
}))

/*
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

// description du schéma
//const typeDefs = buildSchema(`
const typeDefs =`
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;
 

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => authors.find(e => e.id == id ),
  },

  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = posts.find( e => e.id == postId );
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },

  Author: {
    posts: author => posts.filter(e => e.authorId == author.id ),
  },

  Post: {
    author: post => authors.find(e => e.id == post.authorId ),
  },
};


router.use('/', graphqlHTTP({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  //rootValue: root,
  graphiql: true,
})
)
*/
export default router;

