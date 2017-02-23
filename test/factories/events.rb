FactoryGirl.define do
  factory :event do
    title "MyString"
    date "2017-02-23 16:27:31"
    location_lat 1.5
    location_lon 1.5
    location_name "MyString"
    body "MyText"
    created_by nil
    is_active false
  end
end
