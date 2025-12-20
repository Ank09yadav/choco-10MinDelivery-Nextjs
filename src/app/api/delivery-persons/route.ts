import { db } from "@/lib/DB/db";
import { deliveryPersons, warehouses } from "@/lib/DB/schema";
import { deliveryPersonValidator } from "@/lib/validators/deliveryPersonValidator";
import { desc, eq } from "drizzle-orm";


export async function POST(request : Request){
    const data = await request.json();

    let validatedData;

    try {
        validatedData = deliveryPersonValidator.parse(data);
    } catch (error) {
        return Response.json({message: error}, {status: 400});
    }

    try {
        await db.insert(deliveryPersons).values(validatedData);
        return Response.json({message: "Delivery person created successfully"}, {status: 201});
    } catch (error) {
        return Response.json({message: "Failed to create delivery person"}, {status: 500});
    }
}

export async function GET(){
    try {
        const allDeliveryPersons = await db.select({
            id: deliveryPersons.id,
            name: deliveryPersons.name,
            phone: deliveryPersons.phone,
            warehouse: warehouses.name,
            warehousePincode: warehouses.pincode
        }).from(deliveryPersons).leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id)).orderBy(desc(deliveryPersons.id));
        return Response.json({deliveryPersons: allDeliveryPersons}, {status: 201});
    } catch (error) {
        return Response.json({message: "Failed to fetch delivery persons"}, {status: 500});
    }
}