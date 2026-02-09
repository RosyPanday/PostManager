import { DataTypes, Model, Sequelize } from 'sequelize';
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

//  Defining the class outside the function so it can be used as a type
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare uName: string;
    declare uPassword: string;
    declare uContact: bigint;

    static associate(models: any) {
         User.hasMany(models.Post, { foreignKey: 'userId' });
    }
}

// this function recieves sequelize connection instance as argument from index.ts
export default (sequelize: Sequelize) => {
    User.init(
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
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
        }
    );

    return User;
};