# Farm Application

## Description
A UI renders the farms that are saved in the database in a table. A user can use filter to render the farm data. The filter that can be used is sensor type filter. Additionally, the UI renders a graphical view for the values of different sensor types. 

## Requirements
* Node.js
* MongoDB (MongoDB atlas cloud can be used too)
* Git 

## Getting started
Open a terminal (or a shell) and navigate to a location of your choice. Then issue the following command to clone the repository:
#### `git clone https://github.com/bikarnap/dev-academy-pre-assignment.git`

## Start the backend server
After cloning the repository as mentioned above, run the following commands
##### `cd dev-academy-pre-assignment`
##### `cd farm-app-be`
Then create an .env file, where the port and MongoDB url should be defined. for example: 
```
MONGODB_URI=mongodb://localhost:27017/farmsdb

TEST_MONGODB_URI=mongodb://localhost:27017/farmstestdb

PORT=3001
```
In order to upload the csv files, issue the command 
##### `node utils/uploadCsv.js`
__Wait for some time so that the contents of the provided csv files get uploaded to the database collection. Command line arguments can also be given to upload from a different csv file (more than one csv file can be given with full path, each file sepaarated with a space). The upload should be manually stopped by pressing Ctrl + C__
##### `npm install`
##### `npm start`
The server will start listening on port 3001 (assuming the defined port is 3001). [Click-here](#rest-apis) for API endpoints. 
```
Note: Make sure that the defined port (for example: 3001) is not being used by other services.
```

## Start the frontend 
Open a new terminal (or a shell), and navigate to the the _dev-academy-pre-assignment_ folder that was cloned previously. Then issue the following commands.
##### `cd farm-app-fe`
##### `npm install`
##### `npm start`

After this, the frontend app should automatically launch on the browswer at 
##### `localhost:3000`
In case, the app does not launch automatically, it can be manually launched on your browser by entering
##### `localhost:3000`
```
Note: Make sure that the port 3000 is not being used by other services.
```

## Screenshot of running application

![Farm App](./application_screenshot.PNG)

## REST APIs
* GET farms: `http://localhost:3001/api/farms/`
* GET farms by sensorType: `http://localhost:3001/api/farms?sensorType={sensorType}`
* GET farms by month: `http://localhost:3001/api/farms?month={month}`
* GET a single farm: `http://localhost:3001/api/farms/:id`
* POST a farm: `http://localhost:3001/api/farms`
* PUT a farm (UPDATE): `http://localhost:3001/api/farms/:id`
* DELETE a farm : `http://localhost:3001/api/farms/:id`
__Additionally, when fetching farms page and limit can be given as query strings__

## Tools used during development
* The frontend was bootstraped with [Create React App](https://github.com/facebook/create-react-app)
* The backend was created as an `npm` project
* IDE used: `Visual Studio Code`
* Version Control using `git`
* Database: `MongoDB`
* `REST client` in Visual Studio Code for performing HTTP actions

## Dependencies Used
* `express` for backend/api server
* `axios` for fetching data from the backend/api
* `mongoose` for mongoDB
* `cors`for allowing cross-origin in the backend server
* `dotenv` for environment variables 

## Development Dependencies Used
* `cross-env` for cross-platform environment
* `nodemon` for reloading the devlopment backend server
* `jest` for testing
* `supertest` for testing the API