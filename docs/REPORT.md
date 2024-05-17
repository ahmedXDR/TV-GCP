# Report

## Team Members

| Name                | Roles               |
| ------------------- | ------------------- |
| Ahmad Saber Soliman | Backend             |
| Gleb Statkevich     | Video Demo          |
| Aleksandr Ragulin   | Frontend, Report    |
| Gurniak Nikita      | Frontend            |
| Zeyad Alagamy       | Frontend, Team Lead |

## Architecture

Our architecture is fairly simple and consists of 3 components:

- Frontend
- Google Cloud Functions as Backend
- FireBase as a database

The frontend is a React application which firstly authenticates the user using
Google Auth and saves the user into FireBase. After the user is authenticated,
one can access the main page where user creates a request for elevating
permissions.

When request is created the frontend sends it to the backend, which uses
native Google Cloud IAM API for managing permissions. Also backend logs such
requests and requests can be accepted or declined by using corresponding methods
of its API.

As we are using GCP, we decided to rely on other google services like FireBase
and Auth to simplify the process of development.

## Workflow

Our workflow is based on the following steps:

1. Firstly we evaluated project requirements
2. Then we created a basic architecture
3. After that we started developing the backend and frontend simultaneously
4. When the backend was ready, we started testing the integration of it with the
   frontend and applying some fixes
5. Lastly, we created user documentation and video demo.
