import  {DataTypes,Model} from 'sequelize';
import type {InferAttributes,InferCreationAttributes,CreationOptional, ForeignKey, Sequelize} from 'sequelize';

class Posts extends Model<InferAttributes<Posts>, InferCreationAttributes<Posts>>{ 
    declare id: CreationOptional<number>;
    declare pTitle: string;
    declare pBody:string;
    declare userId: ForeignKey<number>;

    static associate(models: any) {
         Posts.belongsTo(models.Users,{
                foreignKey:'userId',
         });
    }
};

export default (sequelize:Sequelize) =>{
        
Posts.init({
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
    modelName:'Posts',
    tableName:'Posts',

})
  return Posts;
};