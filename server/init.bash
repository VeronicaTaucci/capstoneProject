# sequelize model:generate --name users --attributes email:string,password:string
# sequelize model:generate --name media --attributes comment:string,video:string,recording:string
# sequelize migration:create --name modify_users_add_new_fields
# sequelize migration:create --name modify_media_fields
# sequelize migration:create --name remove_video_column