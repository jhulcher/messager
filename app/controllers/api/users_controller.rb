class Api::UsersController < ApplicationController
  before_filter :require_signed_in!

  def index
    @users = User.where.not(id: current_user.id)
  end

  def show
    @user = User.find(params[:id])

    @messages1 = Message.where(talker_id: current_user.id, listener_id: @user.id)
    @messages2 = Message.where(talker_id: @user.id, listener_id: current_user.id)
    @messages = ((@messages1.concat(@messages2)).sort_by { |mess| mess.created_at }).uniq
  end


  private
  def user_params
    params.require(:user).permit(:password, :username)
  end

end
