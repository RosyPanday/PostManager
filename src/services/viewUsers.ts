import { Op } from 'sequelize';
import db from '../database/models/index.js';

const Users = db.Users;
const limit :number= 5;

export interface ITypeUser {
    id: number; 
    uName: string;
    uContact: string;
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
            uContact: user.uContact.toString()
        }));

       

    return retrievedUsers;
       
        
   
}