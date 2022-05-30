# sequelize model:generate --name users --attributes email:string,password:string
# sequelize model:generate --name media --attributes comment:string,video:string,recording:string
# sequelize migration:create --name modify_users_add_new_fields
# sequelize migration:create --name modify_media_fields
# sequelize migration:create --name remove_video_column
# sequelize migration:create --name remove_userProfileID
# sequelize migration:create --name drop_media_table
# sequelize migration:create --name readd_media_table
# sequelize migration:create --name drop_users_table
# sequelize model:generate --name albums --attributes name:string,userID:integer,description:string
# sequelize migration:create --name add_favorites_to_media_table
