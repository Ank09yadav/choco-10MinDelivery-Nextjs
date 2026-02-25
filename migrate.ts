import { config } from 'dotenv';
config({ path: '.env.local' });

import { connection, db } from "@/lib/DB/db";
import { migrate } from "drizzle-orm/postgres-js/migrator";


(async () => {
    try {
        await migrate(db, { migrationsFolder: "./drizzle" })
        console.log("Migration completed successfully");
    } catch (error) {
        console.error("Error migrating:", error);
    } finally {
        await connection.end();
    }
})();