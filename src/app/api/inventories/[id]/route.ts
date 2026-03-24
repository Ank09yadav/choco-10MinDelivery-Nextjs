import { db } from "@/lib/DB/db";
import { inventories } from "@/lib/DB/schema";
import { eq } from "drizzle-orm";
import { inventoryValidator } from "@/lib/validators/inventoryValidator";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    try {
        const item = await db.select().from(inventories).where(eq(inventories.id, Number(id))).limit(1);
        if (item.length === 0) {
            return Response.json({ message: "Inventory record not found" }, { status: 404 });
        }
        return Response.json(item[0], { status: 200 });
    } catch (error) {
        return Response.json({ message: "Failed to fetch inventory record" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    try {
        await db.delete(inventories).where(eq(inventories.id, Number(id)));
        return Response.json({ message: "Inventory record deleted successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Failed to delete inventory record" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const body = await request.json();
    let validatedData;

    try {
        validatedData = inventoryValidator.parse(body);
        await db.update(inventories).set(validatedData).where(eq(inventories.id, Number(id)));
        return Response.json({ message: "Inventory updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Update error", error);
        return Response.json({ message: "Failed to update inventory record" }, { status: 500 });
    }
}
