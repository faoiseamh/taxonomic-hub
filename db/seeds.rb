# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

category_health = Category.create! title: "Health"
category_health.topics.create!  title: "Reproductive Rights",
                                subtitle: "Legal rights and freedoms relating to reproduction and reproductive health",
                                body: "Reproductive rights rest on the recognition of the basic right of all couples and individuals to decide freely and responsibly the number, spacing and timing of their children and to have the information and means to do so, and the right to attain the highest standard of sexual and reproductive health. They also include the right of all to make decisions concerning reproduction free of discrimination, coercion and violence."