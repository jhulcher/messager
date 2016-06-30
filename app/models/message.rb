class Message < ActiveRecord::Base

  belongs_to :user,
  primary_key: :id,
  foreign_key: :talker_id,
  class_name: "User"

  belongs_to :listener,
  primary_key: :id,
  foreign_key: :listener_id,
  class_name: "User"

end
