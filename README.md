## graphql-server

A simple GraphQL server built in a Node.js environment using GraphQL.js, Express Web Server and  middleware express-graphql.

Getting Started
------------

```bash
# Clone the code
git clone https://github.com/patelg123/graphql-server.git

# Change Directory
cd graphql-server

# Install the dependencies
npm i

# Start the application
node server.js

# The server should be running on port 4000
http://localhost:4000/graphql

```

Example Queries For GraphiQL
```bash
query getSingleCourse($courseID: Int!) {
    course(id: $courseID) {
        title
        author
        description
        topic
        url
    }
}

QUERY VARIABLES BOX:

{ 
    "courseID":1
}
---------------------------------------
query getAllCourses($topic: String) {
  courses(topic: $topic) {
	title
        author
        description
        topic
        url
  }
}

QUERY VARIABLES BOX:

{
  "topic": "" 
}

{
  "topic": "Node.js" 
}



```
