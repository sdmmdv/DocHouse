# DocHouse - Doctor Appointment Web Application

MERN full stack web application that provides doctor appointment services. The application
intended to serve two sorts of user audience: patients and doctors, who are required to register in
order to use services, whereas, guests will be able to collect general details and information about
the provided facilities. Technologies used in development: Node js, Express js, MongoDb, React js.

## Demo

[DocHouse WebApp](https://doc-house-frontend.onrender.com/)

## Installation

In order to run the application in local environment follow instructions below:

1. Copy the following URL of github public repository of the project
[DocHouse - Doctor Appointment Web Application](https://github.com/MoneiBall/DocHouse)
1. On your local machine, clone the repository to the working directory using
`git clone <https-URL>` command.
1. Navigate to the cloned repository, and install all dependencies for the server
application using the `npm install` command.
1. Navigate to the client repository using `cd doc-house`. Install all dependencies for
the client application using `npm install` command.
1. To test the server application run `npm test` command.
To test the client application run `npm client-test` command.
1. Navigate back to the root repository, and run `npm start` which will run both client
and server application concurrently.
1. If there have not occurred prior errors until this step, npm successfully will redirect
you to **Dochouse** homepage on your default browser.

### Environment Config

Application is in development mode. Add your environment variables of database and external service credentials
to the /backend/.env file. In production mode, configure environment variables and secrets in [render](https://render.com/docs/configure-environment-variables)
Make sure following variables are well-defined.

* `DB_URI=''`
* `DB_TEST_URI=''`
* `JWT_SECRET=''`
* `STRIPE_SECRET=''`

### Deployment

Client and server applications will be deployed separately using [render platform](https://render.com)

To deploy FrontEnd go to the dashboard, Select `New+ --> Static Site`
Continue with following recommended variables, leave others as they are.

```text  
    Name: <unique-name-for-client-app>
    Build Command : npm run build
    Publish Directory : build
    Branch : <name-of-branch>
    Root Directory : doc-house
```

To deploy Backend go to the dashboard, `Select New+ --> Web Service`
Continue with following recommended values, leave others as they are.

```text
    Name: <unique-name-for-service-app>
    Build Command: npm start
    Start Command: npm run server
    Branch: <name-of-branch>
```

### Continuous Integration

[Github CI workflow](https://github.com/sdmmdv/DocHouse/blob/.github/workflows/mainCI.yml) used to automate following operations of application: build, test and deploy to clouds.
Make sure to define deployment related secrets in github project. Source: [How?](https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28)

## Screenshots

**HomePage**                     |  **Login**
:-------------------------------:|:---------------------------------:
![HomePage](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/homepage.png)  |  ![Login](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/loginUser.png)
**Sidebar**                      |  **Profile**
"README.md" 105L, 5380B                                                                                                                                                                                                                                               10,58         Top
