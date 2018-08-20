# Wiki-Maps

## Project Description

Midterm project written with Alex Zvaniga in 5 days.

Wiki-Maps is a website to share points of interest between people.
It allows for creation of new private or public maps, and allows for manual points entry by click, or via a search bar.

This project is built on NodeJS Express, using normal HTML/CSS front end, and a PSQL backend using Knex.
The APIs being used are the google maps, geolocator, static maps, and streetview APIs.

## Screenshots
!["Screenshot of main page"](https://github.com/RexChiu/LHL-Midterm-WikiMaps/blob/master/docs/main-page.png)
!["Screenshot of new map page"](https://github.com/RexChiu/LHL-Midterm-WikiMaps/blob/master/docs/new-map.png)
!["Screenshot of map details page"](https://github.com/RexChiu/LHL-Midterm-WikiMaps/blob/master/docs/map-details.png)
!["Screenshot of profile page"](https://github.com/RexChiu/LHL-Midterm-WikiMaps/blob/master/docs/user-profile.png)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
