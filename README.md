# Setup
- Install rvm from https://rvm.io/
- Install ruby 2.2.5
~~~~
rvm install ruby-2.2.5
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
rake db:migrate
~~~~


- You should now be ready to run the app
~~~~
./start
~~~~

- Connect to local server at http://localhost:3000
- Test prototype page at http://localhost:3000/categories

# Todo / misc notes (incomplete)
- Add sublime ignores for all the node dirs
- Reimplement categories in JSX + redux: https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.hr4uzpb8x


https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367#.40nk5bmqv