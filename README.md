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
Make sure to define deployment related secrets in github project. [Source](https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28)

## Screenshots

**HomePage**                     |  **Login**
:-------------------------------:|:---------------------------------:
![HomePage](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/homepage.png)  |  ![Login](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/loginUser.png)
![HomePage](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/homepage.png)  |  ![Login](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/loginUser.png)
**Sidebar**                      |  **Profile**
![Sidebar](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/doctorSidebar.png)  |  ![Profile](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/doctorProfile.png)
![Sidebar](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/doctorSidebar.png)  |  ![Profile](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/doctorProfile.png)
**Search**                       |  **Review**
![Search](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/searchDoctor.png)  |  ![Review](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/reviewDoctor.png)
![Search](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/searchDoctor.png)  |  ![Review](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/reviewDoctor.png)
**Payment**                      |  **Chat**
![Payment](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/paymentStep2.png)  |  ![Chat](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/doctorChat.png)
![Payment](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/paymentStep2.png)  |  ![Chat](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/doctorChat.png)

## Use case Diagram
![Use Case Diagram](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/usecase_diag.png)
![Use Case Diagram](https://github.com/sdmmdv/DocHouse/blob/master/screenshots/usecase_diag.png)

## Future improvements
* Providing advanced testing methods, in particular more integration tests.
* Adding instant notification system for better user experience.
* Processing real payments that preserve commerce protocols.
## References
* React Documentation,
 URL: https://reactjs.org/docs/getting-started, Last accessed on 20/11/2020.
* Node JS Documentation,
 URL: https://nodejs.org/docs/latest-v13.x/api, Last accessed on 27/10/2020.
* Express Documentation,
 URL: https://expressjs.com/en/5x/api, Last accessed on 13/10/2020.
* MongoDB Documentation,
 URL: https://docs.mongodb.com/manual, Last accessed on 01/11/2020.
* Material-UI Documentation,
 URL: https://material-ui.com, Last accessed on 05/11/2020.
* Jamie Shi, “MERN-Social-Network” github public repository,
 URL: https://github.com/jm-shi/MERN-Social-Network,
 Last accessed on 04/10/2020.
* Clever Programmer, Build a Whatsapp Clone with MERN Stack
 URL: https://www.youtube.com/watch?v=gzdQDxzW2Tw,
 Last accessed on 05/10/2020.                                                                                                                                                                                                       10,58         Top
