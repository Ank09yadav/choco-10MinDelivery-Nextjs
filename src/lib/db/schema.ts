
import {pgTable,varchar, serial, text, timestamp, integer, index} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import { id } from "zod/locales";

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


export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name:varchar("name",{length:100}).notNull(),
    image:text("image").notNull(),
    description:text("description").notNull(),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const warehouse = pgTable("warehouse", {
    id: serial("id").primaryKey(),
    name:varchar("name",{length:100}).notNull(),
    pincode:varchar("pincode",{length:6}).notNull(),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
},(table)=>({
    pincodeIndex: index("pincode_index").on(table.pincode)
})  
);

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(()=>users.id,{onDelete:"cascade",onUpdate:"cascade"}),
    productId: integer("product_id").notNull().references(()=>products.id,{onDelete:"cascade",onUpdate:"cascade"}),
    quantity: integer("quantity").notNull().default(1),
    status: varchar("status",{length:20}).notNull().default("pending"),
    warehouseId: integer("warehouse_id").references(()=>warehouse.id,{onDelete:"set null",onUpdate:"cascade"}),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const deliveryPersons = pgTable("delivery_persons", {
    id: serial("id").primaryKey(),
    name:varchar("name",{length:100}).notNull(),
    phone:varchar("phone",{length:13}).notNull(),
    warehouseId: integer("warehouse_id").notNull().references(()=>warehouse.id,{onDelete:"cascade",onUpdate:"cascade"}),
    orderId: integer("order_id").references(()=>orders.id,{onDelete:"set null",onUpdate:"cascade"}),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}
);