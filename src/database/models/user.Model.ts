import { DataTypes, Model, Sequelize } from 'sequelize';
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

//  Defining the class outside the function so it can be used as a type
class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
    declare id: CreationOptional<number>;
    declare uName: string;
    declare uPassword: string;
    declare uContact: bigint;

    static associate(models: any) {
         Users.hasMany(models.Posts, { foreignKey: 'userId' });
    }
}

// this function recieves sequelize connection instance as argument from index.ts
export default (sequelize: Sequelize) => {
    Users.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            uName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            uPassword: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            uContact: {
                type: DataTypes.BIGINT,
            }
        },
        {
            sequelize, // comes from function argument
            modelName: 'Users',
            tableName: 'Users',
            timestamps: true,
        }
    );

    return Users;
};