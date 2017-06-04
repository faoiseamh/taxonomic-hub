# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170604201344) do

  create_table "access_grants", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "code"
    t.string   "access_token"
    t.string   "refresh_token"
    t.datetime "access_token_expires_at"
    t.integer  "user_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["user_id"], name: "index_access_grants_on_user_id", using: :btree
  end

  create_table "categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "title",                               null: false
    t.string   "color",      limit: 7,                null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.boolean  "is_active",            default: true, null: false
  end

  create_table "category_topic_relationships", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "category_id"
    t.integer  "topic_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "is_active",   default: true, null: false
    t.index ["category_id", "topic_id"], name: "index_category_topic_relationships_on_category_id_and_topic_id", unique: true, using: :btree
    t.index ["category_id"], name: "index_category_topic_relationships_on_category_id", using: :btree
    t.index ["topic_id"], name: "index_category_topic_relationships_on_topic_id", using: :btree
  end

  create_table "event_favorites", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id",                   null: false
    t.integer  "event_id",                  null: false
    t.boolean  "is_active",  default: true, null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["event_id"], name: "index_event_favorites_on_event_id", using: :btree
    t.index ["user_id"], name: "index_event_favorites_on_user_id", using: :btree
  end

  create_table "event_topic_relationships", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "event_id"
    t.integer  "topic_id"
    t.boolean  "is_active",  default: true, null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["event_id"], name: "index_event_topic_relationships_on_event_id", using: :btree
    t.index ["topic_id"], name: "index_event_topic_relationships_on_topic_id", using: :btree
  end

  create_table "events", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "title",                                      null: false
    t.datetime "date"
    t.float    "location_lat",  limit: 24
    t.float    "location_lon",  limit: 24
    t.string   "location_name"
    t.text     "body",          limit: 65535
    t.integer  "created_by_id"
    t.boolean  "is_active",                   default: true, null: false
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.index ["created_by_id"], name: "index_events_on_created_by_id", using: :btree
  end

  create_table "events_users", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "user_id",  null: false
    t.integer "event_id", null: false
  end

  create_table "favorites", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean  "active"
  end

  create_table "topics", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "title",                                   null: false
    t.string   "subtitle"
    t.text     "body",       limit: 65535
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.boolean  "is_active",                default: true, null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "access_grants", "users"
  add_foreign_key "category_topic_relationships", "categories"
  add_foreign_key "category_topic_relationships", "topics"
  add_foreign_key "event_favorites", "events"
  add_foreign_key "event_favorites", "users"
  add_foreign_key "event_topic_relationships", "events"
  add_foreign_key "event_topic_relationships", "topics"
end
