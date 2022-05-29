# Angular13 CRUD Operations w/ MaterialUI and JSON-Server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Description
This project utilizes three key factors: 
- MaterialUI:
We utilize many different components and packages from MaterialUI! When we first create our project, we need to add "ng add @angular/material". From there, we need to import dependencies in our app.module.ts, depending on the different components that we are using from: https://material.angular.io/
- CRUD Operations:
With the help of MaterialUI displaying our data, we need to enable certaion operations so the user can manipulate the data on our JSON-Server. In this application, you should be able to create, edit, delete, and grab all products on the home page. 
- JSON-Server (our fake Rest-API Web Service):
Usually, I would just create my own express server to host my REST-APIs; however, JSON-Server still works and acts as our "fake" web service in order to manipulate our productList objects. This plugin is great if we want to work with a REST API of our own without the hassle of creating a whole new express server to host our API and database connection. **Important** if you want to use this in your local projects in the future, remember to issue the command: npm install -g json-server



## Deployment
To deploy this project locally:
- git clone https://github.com/NLaw5/Angular13CRUDw-MaterialUI.git
- npm install 
- **IMPORTANT** Make sure to start the rest-api server --> json-server --watch db.json
- After json-server is running --> ng serve

