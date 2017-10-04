# Trekk
[Live Site](http://trekk-trails.herokuapp.com/)

## Synopsis
Trekk is a journal for hikers. Trekk allows a user to create an account, search for hiking trails, and add them to their personal journal. The journal can be used for storing hiking trails of interest or as a personal record of hikes the user has gone on with notes and photos.

#### Features
All journal entries and all notes/photos within are associated to each user.

Makes use of Google's map API and places API for geolocation and listings of hiking trails, respectively.

## Getting Started
With rails and npm installed, clone this repo down and bundle / npm install. Run ```rails s``` and ```npm start``` to boot up the servers. Navigate to the default ```localhost:3000``` to view the site locally.

## Build
Trekk uses a Ruby on Rails back end with React.js for the front end.

### Notable Gems / Node Packages
* [Devise](https://github.com/plataformatec/devise) for user authentication.
* [React-Bootstrap](https://react-bootstrap.github.io/) for responsive design and modal components.
* [React-Grid-Gallery](https://benhowell.github.io/react-grid-gallery/) for photo display and slider presentation.

## Motivation
Hiking is something I love to do. Moving to a new city, this is a faster way to find hiking trails and information on them. Storing the trails keeps in easy record for your personal parsing through trails on Google.
