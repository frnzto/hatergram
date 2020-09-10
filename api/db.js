import { Sequelize, DataTypes, Model } from 'sequelize'
export const sequelize = new Sequelize(
    'hatergram',
    'kamen',
    'kamen22',
    {
        host: 'localhost',
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
