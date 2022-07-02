# spring-static-web-content-example

This project shows an approach how to build an [Angular-App](https://angular.io/) within [Maven](https://maven.apache.org/) and providing the bundle within the [Spring-Boot](https://spring.io/projects/spring-boot) application.

## How I setup this project

* Use [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) to build an Angular-App within Maven environment
* Use [maven-resources-plugin]() to copy the Angular bundle into backend's target as static resources
* Use [jest](https://jestjs.io/) to run the Angular unit tests
* Use [cypress](https://www.cypress.io/) to run the Angular E2E tests
* Use [Deploy to Heroku](https://github.com/marketplace/actions/deploy-to-heroku) to deploy the Spring-Boot container to [heroku](https://heroku.com/)

## Further links

* [heroku instance](https://spring-static-web-content.herokuapp.com/)
