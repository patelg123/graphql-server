const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

var coursesData = require('./data.js');

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

//Root Resolver
var root = {
    course: getCourse,
    courses: getCourses
};
// Resolver functions
var getCourse = function(args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}
var getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}



// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    // the root value to the executor
    rootValue: root,
    //provides an intereface to allow us to test queries
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
