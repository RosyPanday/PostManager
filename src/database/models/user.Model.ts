import  {DataTypes,Model} from 'sequelize';
import type {InferAttributes,InferCreationAttributes,CreationOptional} from 'sequelize';
import { db } from '../connection.js';

class User extends Model<InferAttributes<User>,InferCreationAttributes<User>>
{
    declare id: CreationOptional<number>;
    declare uName: string;
    declare uContact:bigint;

};

User.init(
    //first argument is the column names
    {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    uName:{
        type:DataTypes.STRING,
        
    },
    uContact:{
        type:DataTypes.BIGINT,
    }
 },
    //second argument
  
  {
     sequelize:db.sequelize, //connection instance, keys cant be db.sequelize directly so its named sequelize
     modelName:'User',
     tableName:'users',
     timestamps:true,
  }
  
);
export default User;
