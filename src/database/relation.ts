import User from './models/user.Model.js';

import Post from './models/post.Model.js';

 User.hasMany(Post,{
   foreignKey:'userId'
 });
 Post.belongsTo(User,{
   foreignKey:'userId'
 });

 export const db= {
   User,
   Post,
 }
