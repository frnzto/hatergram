import { Sequelize, DataTypes, Model } from 'sequelize'
require('dotenv').config()

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
)

const User = sequelize.define('user',{
   
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    avatar: {
        type: DataTypes.STRING(1234),

    },
    info: {
        type: DataTypes.STRING,
    }
    
    
})
const Post = sequelize.define('post', {
    caption: {
      type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING(1234),
        allowNull:false
    },
    avatar: {
        type: DataTypes.STRING,
    }
  });

const Hate = sequelize.define('hates')
const Comment = sequelize.define('comment',{
    comment: {
        type: DataTypes.STRING(600),
    },
    
})

const Follower = sequelize.define('follower', {
    followed: {
        type: DataTypes.INTEGER
    },
    follower: {
        type: DataTypes.INTEGER
    }
})

const ChatRoom = sequelize.define('chatroom',{
    name:{
        type: DataTypes.STRING,
    },
    user1:{
        type: DataTypes.INTEGER
    },
    user2:{
        type: DataTypes.INTEGER
    }
})

const Message = sequelize.define('message', {
    chatroom:{
        type: DataTypes.STRING,
    },
    message:{
        type: DataTypes.STRING
    }
    
})
  
  // Relations
User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Hate);
Hate.belongsTo(Post)

User.hasMany(Hate);
Hate.belongsTo(User)

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Message);
Message.belongsTo(User)

