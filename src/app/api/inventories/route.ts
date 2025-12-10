import { db } from "@/lib/db/db";
import { inventories } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";

export async function POST(request: Request) {
    const requestData = await request.json();
    let validateData ;
    try {
        validateData= await inventorySchema.parse(requestData);

    } catch (error) {
        return Response.json({message:error}, {status:400});
    }
    //insert into DB
    try {
        console.log(validateData);
        await db.insert(inventories).values(validateData);
        
        return Response.json({message:"Inventory stored successfully."}, {status:201});
    } catch (error) {
        console.log(error);
        return Response.json({message:"Failed to store inventory."}, {status:500});
    }
}
