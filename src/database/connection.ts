// Import the 'db' object which already has the connection inside it
import db from './models/index.js'; 

export const connectDb = async (): Promise<void> => {
    try {
        // We use the sequelize instance attached to the db manager
        await db.sequelize.authenticate();
        console.log(" Database authenticated successfully.");
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(" Connection error:", err.message);
        }
    }
};

connectDb();