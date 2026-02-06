import  {DataTypes,Model} from 'sequelize';
import type {InferAttributes,InferCreationAttributes,CreationOptional} from 'sequelize';
import { sequelize } from '../connection.js';  //sequelize is imported from connection, in which post and user models are imported(asynchronous and hoisting) which is causing circular dependency, left to fix

class User extends Model<InferAttributes<User>,InferCreationAttributes<User>>
{
    declare id: CreationOptional<number>;
    declare uName: string;
    declare uPassword:string;
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
        allowNull:false,
        
    },uPassword:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    uContact:{
        type:DataTypes.BIGINT,
    }
 },
    //second argument
  
  {
     sequelize,
     modelName:'User',
     tableName:'users',
     timestamps:true,
  }
  
);
export default User;
