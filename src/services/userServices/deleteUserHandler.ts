import db from '../../database/models/index.js'
const Users= db.Users;
export const deleteUserHandler=async(jwt_id:number):Promise<number>=> {
      const rowsDeleted=  await Users.destroy({
          where :{
            id:jwt_id,
          }
        })

        return rowsDeleted;
}