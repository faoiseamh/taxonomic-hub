# Overview
This is an app that consists of a Rails backend that serves as an API and helps to initially render the page. After initial page load, a single page javascript app takes over using React as a view layer, Redux to manage a global state, and React Router to handle the page routing. This React stack is also used on the backend to render the initial page for search engine indexing.

## Core Technologies
- [Rails](https://github.com/rails/rails)
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reactjs/redux)
- [React-Router](https://github.com/ReactTraining/react-router)

## Requirements
- Ruby 2.3.3+
- Babel (ES6 JavaScript support)
- Node 6.x
- MySQL (although could swap dev to use sqlite3 / postgres if needed)

## Directory structure
- **app** - rails controllers, models, views, and assets
- **config** - rails configuration and routing
- **db** - rails database schema and migrations
- **client** - react client application, node packages, webpack config
    - **app/bundles/action_hub** - main react app to pay attention to
        - **actions** - redux action creators. This is how the state is modified.
        - **components** - react components
        - **constants** - react/redux constants. Mainly used for redux action creators
        - **containers** - react contaienrs. Primarily serve as entry points to components that bring in some redux and router data.
        - **layout** - react layouts that house the general style/layout of the site that doens't change between pages. The "overall" container
        - **reducers** - redux reducers. This is how the state is read.
        - **routes** - react router routes. This maps paths to the components that will be rendered for them
        - **startup** - the main entry point for client and server apps. Server app is a mirror of client app and used for rendering the first page on the server so search engines which do not execute javascript can still index the site. These register components and wrap the routes in a redux store and a material-ui theme provider (just other "components" that must enclose all of our content to enable redux and material-ui functionality)
        - **store** - redux stores. Where the state lives.
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

## Sublime Text Setup
If you are using sublime text, the following packages will make development nice and easy

### Linting / syntax packages
- SublimeLinter
- SublimeLinter-contrib-eslint
- Babel

### Other recommendations
- AllAutocomplete
- BeautifyRuby
- BracketHighlighter
- FileHistory (let's you use ctrl+shift+t like you can in other programs to open previously closed tabs)
- Git
- Git Conflict Resolver
- GitGutter
- JSON Reindent
- Markdown Preview
- Railscasts Extended
- Sass
- SideBarEnhancements
- TrailingSpaces
- Worksheet

# Contributing
- Fork repo
- Branch for your feature
- Squash down to a logical number of commits prior to sending pull request
- Send pull request to master branch
