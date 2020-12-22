# DocHouse - Doctor Appointment Web Application

MERN full stack web application that provides doctor appointment services. The application
intended to serve two sorts of user audience: patients and doctors, who are required to register in
order to use services, whereas, guests will be able to collect general details and information about
the provided facilities. Technologies used in development: Node js, Express js, MongoDb, React js. 

## Installation

In order to run the application in local environment follow instructions below:
1. Copy the following URL of github public repository of the project
[DocHouse - Doctor Appointment Web Application](https://github.com/MoneiBall/DocHouse)
2. On your local machine, clone the repository to the working directory using
`git clone <https-URL>` command.
3. Navigate to the cloned repository, and install all dependencies for the server
application using the `npm install` command.
4. Navigate to the client repository using `cd doc-house`. Install all dependencies for
the client application using `npm install` command.
5. To test the server application run `npm test` command.
To test the client application run `doc-house && npm test` command.
6. Navigate back to the root repository, and run `npm start` which will run both client
and server application concurrently.
7. If there have not occurred prior errors until this step, npm successfully will redirect
you to **Dochouse** homepage on your default browser.

### Environment Config

Application is in development mode. Add your environment variables of database and external service credentials
to the /backend/.env file. In production mode, for Heroku migrate following env variables to config vars.
* `DB_URI=''`
* `DB_TEST_URI=''`
* `JWT_SECRET=''`
* `STRIPE_SECRET=''`

## Screenshots

**HomePage**                     |  **Login**
:-------------------------------:|:---------------------------------:
![HomePage](https://github.com/MoneiBall/DocHouse/blob/master/screenshots/homepage.png)  |  ![Login](https://github.com/MoneiBall/DocHouse/blob/master/screenshots/loginUser.png)
**Sidebar**                      |  **Profile**
![Sidebar](https://github.com/MoneiBall/DocHouse/blob/master/screenshots/doctorSidebar.png)  |  ![Profile](https://github.com/MoneiBall/DocHouse/blob/master/screenshots/doctorProfile.png)
**Search**                       |  **Review**
![Search](https://github.com/MoneiBall/DocHouse/blob/master/screenshots/searchDoctor.png)  |  ![Review](https://github.com/MoneiBall/DocHouse/blob/master/screenshots/reviewDoctor.png)
**Payment**                      |  **Chat**
![Payment](https://github.com/MoneiBall/DocHouse/blob/master/screenshots/paymentStep2.png)  |  ![Chat](https://github.com/MoneiBall/DocHouse/blob/master/screenshots/doctorChat.png)

## Use case Diagram
![Use Case Diagram](https://github.com/MoneiBall/DocHouse/blob/master/screenshots/usecase_diag.png)

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
 Last accessed on 05/10/2020.
* Jest Documentation,
 URL: https://jestjs.io/docs/en/getting-started, Last accessed on 05/12/2020.
* Enzyme Documentation,
 URL: https://enzymejs.github.io/enzyme, Last accessed on 05/12/2020.
