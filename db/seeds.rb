# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User
user = User.create! email: 'test@thecur.rent', password: 'testpass', password_confirmation: 'testpass'

# Categories
category_health = Category.create! title: "Health", color: "#009688"
category_gender_issues = Category.create! title: "Gender Issues", color: "#9c27b0"


# Topics
topic_reproductive_rights = category_health.topics.create!  title: "Reproductive Rights",
                                subtitle: "Legal rights and freedoms relating to reproduction and reproductive health",
                                body: "Reproductive rights rest on the recognition of the basic right of all couples and individuals to decide freely and responsibly the number, spacing and timing of their children and to have the information and means to do so, and the right to attain the highest standard of sexual and reproductive health. They also include the right of all to make decisions concerning reproduction free of discrimination, coercion and violence."
topic_reproductive_rights.categories << category_gender_issues
topic_reproductive_rights.save!

topic_gmo = category_health.topics.create!  title: "GMO", subtitle: "Test", body: "Test"

topic_trans = category_gender_issues.topics.create! title: "Transgender Bathroom Access", subtitle: "Test", body: "Test"


# Events
Event.create! title: "New York Gender Rights March",
              date: 1.week.from_now,
              created_by: user,
              topics: [
                topic_reproductive_rights,
                topic_trans,
              ]
