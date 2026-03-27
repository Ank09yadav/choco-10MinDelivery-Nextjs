import { db } from "@/lib/DB/db";
import { deliveryPersons, products } from "@/lib/DB/schema";
import { eq } from "drizzle-orm";
import { productValidator } from "@/lib/validators/productValidator";
import path from "path";
import { unlink, writeFile } from "node:fs/promises";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    try {
        const item = await db.select().from(deliveryPersons).where(eq(deliveryPersons.id, Number(id))).limit(1);
        if (item.length === 0) {
            return Response.json({message: "Delivery person not found"}, {status:404});
        }
        return Response.json(item[0],{status:200});
    } catch (error) {
        return Response.json({message: "Error fetching delivery person"}, {status:500});
    }
}

// Remove delivery person 
export async function DELETE(request:Request, { params }: { params: Promise<{id:string}>}){
    const id = (await params).id;
    try {
        await db.delete(deliveryPersons).where(eq(deliveryPersons.id, Number(id)));
        return Response.json({message:"delivery Person deleted successfully."}, {status:200})
    } catch (error) {
        console.error(error);
        return Response.json({message:"Some error to delete delivery person."}, { status:500})
    }
}
//Update delivery person 
export async function PUT(request : Request,{params}: {params : Promise<{id: string}>})