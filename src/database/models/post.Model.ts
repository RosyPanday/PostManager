import  {DataTypes,Model} from 'sequelize';
import type {InferAttributes,InferCreationAttributes,CreationOptional, ForeignKey, Sequelize} from 'sequelize';

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{ 
    declare id: CreationOptional<number>;
    declare pTitle: string;
    declare pBody:string;
    declare userId: ForeignKey<number>;

    static associate(models: any) {
         Post.belongsTo(models.User,{
                foreignKey:'userId',
         });
    }
};

export default (sequelize:Sequelize) =>{
        
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
  return Post;
};