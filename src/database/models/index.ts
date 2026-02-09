import { Sequelize, DataTypes } from 'sequelize';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Path to your config
const env = process.env.NODE_ENV || 'development';
const config = require('../config.js')[env];

// Import your model factories manually for 100% type safety
import UserFactory from './user.Model.js';
import PostFactory from './post.Model.js';

const sequelize = new Sequelize(config.url, config);

// import type User from './user.Model.js';
// import type Post from './post.Model.js';

interface database {
       sequelize:Sequelize,
       Sequelize: typeof Sequelize,
       User: ReturnType<typeof UserFactory>,
       Post:ReturnType<typeof PostFactory>, 
}
// Initialize models with type
const db: database= {
  sequelize,
  Sequelize,
  User: UserFactory(sequelize),
  Post: PostFactory(sequelize),
};

// Setup Associations
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// We use Object.values to get the actual objects
Object.values(db).forEach((model) => {
  // We use a "Type Guard" to check if 'associate' exists on this specific value
  if (typeof model === 'function' && 'associate' in model) {
    (model as any).associate(db);
  }
});

export default db;
