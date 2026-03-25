import { db } from "@/lib/DB/db";
import { warehouses } from "@/lib/DB/schema";
import { eq } from "drizzle-orm";
import { warehouseValidator } from "@/lib/validators/warehouseValidator";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    try {
        const warehouse = await db.select().from(warehouses).where(eq(warehouses.id, Number(id))).limit(1);
        if (warehouse.length === 0) {
            return Response.json({ message: "Warehouse not found" }, { status: 404 });
        }
        return Response.json(warehouse[0], { status: 200 });
    } catch (error) {
        return Response.json({ message: "Failed to fetch warehouse" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    try {
        await db.delete(warehouses).where(eq(warehouses.id, Number(id)));
        return Response.json({ message: "Warehouse deleted successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Failed to delete warehouse" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const body = await request.json();
    let validatedData;

    try {
        validatedData = warehouseValidator.parse(body);
        await db.update(warehouses).set(validatedData).where(eq(warehouses.id, Number(id)));
        return Response.json({ message: "Warehouse updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Update error", error);
        return Response.json({ message: "Failed to update warehouse" }, { status: 500 });
    }
}
