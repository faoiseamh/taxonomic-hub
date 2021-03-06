
# Background
This is a react and rails app that was being developed for a "social issues hub" centered around the idea of organizing events based on the topics they were related to. Topics belonged to one or more categories and these collective relationships would be used to draw similarities between events and illustrate intersectionality. I don't currently have the time to continue this side project so I'm open sourcing this as a general platform for organizing content (currently events) based on a tiered relational hierarchy (topics and categoryes - think graph structure).

## Disclaimer

This was my first foray into react and redux so this is by no means an example of the right way to do things in react. This was a learning project for me, so take it with *many grains of salt*.

# Overview
This is an app that consists of a Rails backend that serves as an API and helps to initially render the page. After initial page load, a single page javascript app takes over using React as a view layer, Redux to manage a global state, and React Router to handle the page routing. This React stack is also used on the backend to render the initial page for search engine indexing.

## Core Technologies
- [Rails 5.0](https://github.com/rails/rails)
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

## REST API
There is a REST API exposed to both the React client as well as any React Native or native Android / iOS apps. Right now this is lacking most security protections and documentation but that will come.

~~~
      Alias      VERB   PATH(.format)                      RAILS_CONTROLLER#ACTION
      categories GET    /api/categories(.:format)          categories#index
                 POST   /api/categories(.:format)          categories#create
    new_category GET    /api/categories/new(.:format)      categories#new
   edit_category GET    /api/categories/:id/edit(.:format) categories#edit
        category GET    /api/categories/:id(.:format)      categories#show
                 PATCH  /api/categories/:id(.:format)      categories#update
                 PUT    /api/categories/:id(.:format)      categories#update
                 DELETE /api/categories/:id(.:format)      categories#destroy
          events GET    /api/events(.:format)              events#index
                 POST   /api/events(.:format)              events#create
       new_event GET    /api/events/new(.:format)          events#new
      edit_event GET    /api/events/:id/edit(.:format)     events#edit
           event GET    /api/events/:id(.:format)          events#show
                 PATCH  /api/events/:id(.:format)          events#update
                 PUT    /api/events/:id(.:format)          events#update
                 DELETE /api/events/:id(.:format)          events#destroy
          topics GET    /api/topics(.:format)              topics#index
                 POST   /api/topics(.:format)              topics#create
       new_topic GET    /api/topics/new(.:format)          topics#new
      edit_topic GET    /api/topics/:id/edit(.:format)     topics#edit
           topic GET    /api/topics/:id(.:format)          topics#show
                 PATCH  /api/topics/:id(.:format)          topics#update
                 PUT    /api/topics/:id(.:format)          topics#update
                 DELETE /api/topics/:id(.:format)          topics#destroy
 event_favorites POST   /api/event_favorites(.:format)     event_favorites#create
  event_favorite DELETE /api/event_favorites/:id(.:format) event_favorites#destroy
                 POST   /api/users/sign_in(.:format)       users#sign_in
~~~


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

## QT Installation
QT is needed for capybara and on OSX qt 5.5 is the last version that is installed with QtWebKit. You also need to have xcode install prior to installing the gem so qt can build.

~~~~
brew install qt55
~~~~

You may also need to unlink whatever qt you had previously and link qt55

~~~~
brew unlink qt5
brew unlink qt
brew link qt55 --force
~~~~



## Sublime Text Setup
If you are using sublime text, the following packages will make development nice and easy

### Linting / syntax packages
- SublimeLinter
- SublimeLinter-contrib-eslint
- Babel

Once you run npm install, it will setup the eslint node package (javascript linting javascript!). You can check for errors using ctrl+~ in sublime. When you save a jsx file you should get linting output (try adding a syntax error to see). You can also configure sublime linter to show errors on save which I do to enforce rigor. See [sublime linter config](http://www.sublimelinter.com/en/latest/) for more. I haven't fixed all the linting errors in the project yet so you'll definitely hit some on less-used components.

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
- [Dark Sidebar](https://gist.github.com/umpirsky/5842174)

# References / resources

## Design
- [Material UI Components](http://www.material-ui.com/#/components/table)
- [Material UI Formsy Integration](https://github.com/mbrookes/formsy-material-ui)
- [Material Icons](https://material.io/icons/)

## React Router
- [React Router Basic Example](https://github.com/ReactTraining/react-router#whats-it-look-like)

## Redux
- [Redux Examples](http://redux.js.org/docs/introduction/Examples.html)

## Other dependencies
- [Formsy form validation engine](https://github.com/christianalfoni/formsy-react)

# Considerations
## Relational data in redux
It seems like we should have some ORM style relational model for data in redux. Possibly formalized models as well to get closer to MVC. The [redux-orm project](https://github.com/tommikaikkonen/redux-orm) looks interesting.

Currently we are fetching and retrieving relational data based on an id parameter retrieved from the route (uri). For simplicity, I've left all of these as strings so we don't need to convert to integer in a variety of places. I'm not yet sure whether this is more confusing or not. This does allow for string-based ids later which may be necessary for offline temporary primary key generation.

## Testing
Obviously we should have some integration tests at least. But... not ready for that yet.

# Contributing
- Fork repo
- Branch for your feature
- Squash down to a logical number of commits prior to sending pull request
- Send pull request to master branch
