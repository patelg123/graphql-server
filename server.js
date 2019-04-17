const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const coursesData = require('./data.js');

// Resolver functions
const getCourse = function(args) {
    let id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}
const getCourses = function(args) {
    if (args.topic) {
        let topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}

//Root Resolver
const root = {
    course: getCourse,
    courses: getCourses
};

// GraphQL schema
const schema = buildSchema(`
    type Course {
        id: Int!
        title: String!
        author: String!
        description: String!
        topic: String
        url: String
    },
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
`);





// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    // the root value to the executor
    rootValue: root,
    //provides an intereface to allow us to test queries
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
