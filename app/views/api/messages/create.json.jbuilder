json.array! @messages do |message|
  json.author message.user.username
  json.friend @user.username
  json.user_id message.talker_id
  json.user_since (message.user.created_at.to_time).strftime("%m/%d/%Y")
  json.message_id message.id
  json.body message.message
  json.created_at message.created_at
  json.updated_at message.updated_at
end
