class CreateScreenshots < ActiveRecord::Migration[6.0]
  def change
    create_table :screenshots do |t|
      t.string :url

      t.timestamps
    end
  end
end
