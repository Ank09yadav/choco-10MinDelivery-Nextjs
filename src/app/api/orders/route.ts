import { db } from "@/lib/DB/db";
import { orders, warehouses, deliveryPersons, inventories, products, users } from "@/lib/DB/schema";
import { orderSchema } from "@/lib/validators/orderSchema";
import { eq, and, desc } from "drizzle-orm";

export async function GET() {
    try {
        const allOrders = await db.select({
            id: orders.id,
            productName: products.name,
            userName: users.fname,
            quantity: orders.quantity,
            address: orders.address,
            status: orders.status,
            createdAt: orders.createdAt
        })
        .from(orders)
        .leftJoin(products, eq(orders.productId, products.id))
        .leftJoin(users, eq(orders.userId, users.id))
        .orderBy(desc(orders.id));

        return Response.json({ orders: allOrders }, { status: 200 });
    } catch (error: any) {
        return Response.json({ message: `Failed to fetch orders: ${error.message}` }, { status: 500 });
    }
}

export async function POST(request: Request) {

    try {
        const body = await request.json();
        
        // 1. Validate the data
        const validatedData = orderSchema.parse(body);

        // 2. Business Logic: Find a warehouse for the given pincode
        const warehouse = await db.select()
            .from(warehouses)
            .where(eq(warehouses.pincode, Number(validatedData.pincode)))
            .limit(1);

        if (warehouse.length === 0) {
            return Response.json({ message: "Sorry, we don't deliver to this pincode yet." }, { status: 400 });
        }

        // 3. Check inventory in that warehouse for the product
        const inventory = await db.select()
            .from(inventories)
            .where(and(
                eq(inventories.warehouseId, warehouse[0].id),
                eq(inventories.productId, validatedData.productId)
            ))
            .limit(1);
        
        // Note: In a real app, you'd check quantity here. 
        // For now, we check if the product is even listed in the inventory for this warehouse.
        if (inventory.length === 0) {
            return Response.json({ message: "Product out of stock in your area." }, { status: 400 });
        }

        // 4. Find an available delivery person in that warehouse
        const deliveryPerson = await db.select()
            .from(deliveryPersons)
            .where(eq(deliveryPersons.warehouseId, warehouse[0].id))
            .limit(1);
        
        if (deliveryPerson.length === 0) {
            return Response.json({ message: "No delivery partners available at the moment." }, { status: 400 });
        }

        // 5. Create the order
        const [newOrder] = await db.insert(orders).values({
            userId: validatedData.userId,
            productId: validatedData.productId,
            pincode: validatedData.pincode,
            address: validatedData.address,
            quantity: validatedData.quantity,
            status: "received",
        }).returning();

        // 6. Assign the order to the delivery person (simplified link)
        await db.update(deliveryPersons)
            .set({ orderId: newOrder.id })
            .where(eq(deliveryPersons.id, deliveryPerson[0].id));

        return Response.json({ message: "Order placed successfully", order: newOrder }, { status: 201 });

    } catch (error: any) {
        console.error("Order Creation Error:", error);
        if (error.name === "ZodError") {
            return Response.json({ message: "Invalid order data", errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: `Failed to place order: ${error.message}` }, { status: 500 });
    }
}
