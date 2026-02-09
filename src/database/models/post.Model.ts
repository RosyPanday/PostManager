import  {DataTypes,Model} from 'sequelize';
import { sequelize } from '../connection.js';
import type {InferAttributes,InferCreationAttributes,CreationOptional, ForeignKey} from 'sequelize';
import type User from './user.Model.js'; ///use type cause no function like hasMany,findAll etc for User is called here

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{ 
    declare id: CreationOptional<number>;
    declare pTitle: string;
    declare pBody:string;
    declare userId: ForeignKey<User['id']>;
};

 
Post.init({
     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
     },
     pTitle:{
        type:DataTypes.STRING,
     },
     pBody:{
        type:DataTypes.STRING,
     },
     userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
     }
},
{
    sequelize,
    modelName:'Post',
    tableName:'posts',

})

export default Post;