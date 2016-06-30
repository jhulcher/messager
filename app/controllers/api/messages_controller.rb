class Api::MessagesController < ApplicationController
  before_filter :require_signed_in!

  def new
  end

  def create
    @message = Message.new(message_params)
    @message.talker_id = current_user.id
    @message.save!
    @messages1 = Message.where(talker_id: current_user.id, listener_id: @message.listener_id)
    @messages2 = Message.where(talker_id: @message.listener_id, listener_id: current_user.id)
    @messages = ((@messages1.concat(@messages2)).sort_by { |mess| mess.created_at }).uniq
  end

  private

  def message_params
    params.require(:message).permit(:message, :listener_id)
  end

end
