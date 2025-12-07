
import {pgTable,varchar, serial, text, timestamp} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fname:varchar("fname",{length:100}).notNull(),
    lname:varchar("lname",{length:100}).notNull(),
    email: varchar("email",{length:100}).notNull().unique(),
    provider: varchar("provider",{length:20}).notNull(),
    externalId: varchar("external_id",{length:100}).notNull(),
    image:text("image"),
    role: varchar("role",{length:12}).notNull().default("customer"),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
