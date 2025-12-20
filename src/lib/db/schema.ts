import { sql } from "drizzle-orm";
import { index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users",{
    id : serial("id").primaryKey(),
    fname : varchar("fname",{length: 100}).notNull(),
    lname : varchar("lname",{length: 100}).notNull(),
    email : varchar("email",{length: 100}).notNull().unique(),
    provider: varchar("provider",{length:30}).notNull(),
    externalId: varchar("external_id",{length:100}).notNull(),
    image: text("image"),
    role: varchar("role",{length:12}).notNull().default("customer"),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const products = pgTable("products",{
    id: serial("id").primaryKey(),
    name: varchar("name",{length:100}).notNull(),
    image: text('image'),
    description: text('description'),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const warehouses = pgTable("warehouses", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length:100}).notNull(),
    pincode: integer("pincode").notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
}, (table) => {
    return {
        pincodeIdx: index('pincode_idx').on(table.pincode)
    }
})

export const orders = pgTable("orders", {
    id: serial("id").primaryKey()
,
})

export const deliveryPersons = pgTable("deliveryPersons", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 100}).notNull(),
    phone: varchar("phone", {length: 13}).notNull(),
    warehouseId: integer("warehouse_id").notNull().references(() => warehouses.id, {onDelete :"cascade"}), 
    orderId: integer("order_id").references(() => orders.id, {onDelete: "set null"}),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const inventories = pgTable('inventories', {
    id: serial("id").primaryKey(),
    sku: varchar("sku", {length: 8}).notNull().unique(),
    ordersId: integer("orders_id").references(() => orders.id, {onDelete: "set null"}),
    productId: integer("product_id").notNull().references(() => products.id, {onDelete: "cascade"}),
    warehouseId: integer("warehouse_id").notNull().references(() => warehouses.id, {onDelete: "cascade"}),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})