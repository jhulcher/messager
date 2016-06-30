class Messages < ActiveRecord::Migration

  def change
    create_table :messages do |t|
      t.integer :talker_id
      t.integer :listener_id, null: false
      t.string :message, null: false, :limit => 140
      t.timestamps null: false
    end
    add_index :messages, :listener_id
    add_index :messages, :talker_id
  end

end
