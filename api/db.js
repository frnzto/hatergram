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
        type: DataTypes.STRING,

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
        type: DataTypes.STRING,
        allowNull:false
    },
    avatar: {
        type: DataTypes.STRING,
    }
  });
  
  // Relations
User.hasMany(Post);
Post.belongsTo(User);
  
