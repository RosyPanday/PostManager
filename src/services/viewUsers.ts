import { Op } from 'sequelize';
import db from '../database/models/index.js';

const Users = db.Users;
const limit = 5;

interface ITypeUser {
    id: number; 
    uName: string;
    uContact: bigint;
}

export const viewUsersHandler = async (lastId:number):Promise<ITypeUser[]>=> {

        const whereClause = lastId 
            ? { id: { [Op.gt]: lastId } } 
            : {};

        const dbUsers = await Users.findAll({
            where: whereClause,
            limit: limit,
            order: [['id', 'ASC']],
        });

        const retrievedUsers: ITypeUser[] = dbUsers.map((user: any) => ({
            id: user.id, 
            uName: user.uName,
            uContact: BigInt(user.uContact)
        }));

       

    return retrievedUsers;
       
        
   
}