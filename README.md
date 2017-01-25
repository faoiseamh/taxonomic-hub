# Overview
This is an app that consists of a Rails backend that serves as an API and helps to initially render the page. After initial page load, a single page javascript app takes over using React as a view layer, Redux to manage a global state, and React Router to handle the page routing. This React stack is also used on the backend to render the initial page for search engine indexing.

## Core Technologies
- [Rails](https://github.com/rails/rails)
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reactjs/redux)
- [React-Router](https://github.com/ReactTraining/react-router)

# Setup
- Install rvm from https://rvm.io/
- Install ruby 2.3.3
~~~~
rvm install ruby-2.3.3
~~~~

- Install bundler gem
~~~~
gem install bundler
~~~~

- Install mysql. On osx...
~~~~
brew install mysql
~~~~

- Add a user and database to mysql. Give the user full access to the database. I'd recommend using Sequel Pro or similar on OSX, or just the msyql cli client.
~~~~
user: action_hub
password: gsvrY3T%7x0w
database: action_hub
~~~~


- in checkout, run bundle install to install all of the gems
~~~~
bundle install
~~~~

- on osx, you may need to install xcode command line tools if you don't have them installed already.
- if you encounter compilation issues w/ nokogiri or other gems ("failed to build native extensions"), try this:

~~~~
bundle config build.nokogiri --use-system-libraries
~~~~
and maybe also this

~~~~
CC=/usr/bin/gcc bundle install
~~~~

- in checkout, run npm install to install all of the node packages
~~~~
npm install
~~~~

- Bootstrap your database
~~~~
rake db:reset
~~~~

- You should now be ready to run the app
~~~~
./start
~~~~

- Connect to local server at http://localhost:5000

# Contributing
- Fork repo
- Branch for your feature
- Squash down to a logical number of commits prior to sending pull request
- Send pull request to master branch
