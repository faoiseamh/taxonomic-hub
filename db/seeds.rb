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
event = Event.create! title: "New York Gender Rights March",
              date: 1.week.from_now,
              created_by: user,
              topics: [
                topic_reproductive_rights,
                topic_trans,
              ]


user1 = User.create! email: 'test1@thecur.rent', password: 'testpass', password_confirmation: 'testpass'
user2 = User.create! email: 'test2@thecur.rent', password: 'testpass', password_confirmation: 'testpass'
user3 = User.create! email: 'test3@thecur.rent', password: 'testpass', password_confirmation: 'testpass'
user4 = User.create! email: 'test4@thecur.rent', password: 'testpass', password_confirmation: 'testpass'
user5 = User.create! email: 'test5@thecur.rent', password: 'testpass', password_confirmation: 'testpass'

event1 = Event.create! title: "New York Dog Rights March",
              date: 1.week.from_now,
              created_by: user,
              topics: [
                topic_reproductive_rights,
                topic_trans,
              ]
event2 = Event.create! title: "New York Cat Rights March",
              date: 2.week.from_now,
              created_by: user,
              topics: [
                topic_reproductive_rights,
                topic_trans,
              ]
event3 = Event.create! title: "New York Monkey Rights March",
              date: 3.week.from_now,
              created_by: user,
              topics: [
                topic_reproductive_rights,
                topic_trans,
              ]
event4 = Event.create! title: "New York Dolphin Rights March",
              date: 4.week.from_now,
              created_by: user,
              topics: [
                topic_reproductive_rights,
                topic_trans,
              ]
event5 = Event.create! title: "New York Horse Rights March",
              date: 5.week.from_now,
              created_by: user,
              topics: [
                topic_reproductive_rights,
                topic_trans,
              ]

fav1_event1 = Favorite.create!(user_id: user.id, event_id: event1.id, active: true)
fav2_event1 = Favorite.create!(user_id: user1.id, event_id: event1.id, active: true)
fav3_event1 = Favorite.create!(user_id: user2.id, event_id: event1.id, active: true)
fav4_event1 = Favorite.create!(user_id: user3.id, event_id: event1.id, active: true)
fav5_event1 = Favorite.create!(user_id: user4.id, event_id: event1.id, active: true)

fav6_event2 = Favorite.create!(user_id: user1.id, event_id: event2.id, active: true)
fav7_event2 = Favorite.create!(user_id: user2.id, event_id: event2.id, active: true)
fav8_event2 = Favorite.create!(user_id: user3.id, event_id: event2.id, active: true)

fav9_event3 = Favorite.create!(user_id: user2.id, event_id: event3.id, active: true)
fav10_event3 = Favorite.create!(user_id: user3.id, event_id: event3.id, active: true)

fav11_event4 = Favorite.create!(user_id: user3.id, event_id: event4.id, active: true)
fav12_event4 = Favorite.create!(user_id: user4.id, event_id: event4.id, active: true)
fav13_event4 = Favorite.create!(user_id: user5.id, event_id: event4.id, active: true)
fav14_event4 = Favorite.create!(user_id: user1.id, event_id: event4.id, active: true)

fav15_event5 = Favorite.create!(user_id: user1.id, event_id: event5.id, active: true)
fav16_event5 = Favorite.create!(user_id: user2.id, event_id: event5.id, active: false)
fav17_event5 = Favorite.create!(user_id: user3.id, event_id: event5.id, active: false)
