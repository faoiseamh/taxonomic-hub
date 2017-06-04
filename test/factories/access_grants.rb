FactoryGirl.define do
  factory :access_grant do
    code "MyString"
    access_token "MyString"
    refresh_token "MyString"
    access_token_expires_at "2017-06-04 16:13:44"
    user nil
  end
end
