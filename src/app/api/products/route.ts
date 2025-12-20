import { db } from "@/lib/DB/db";
import { products } from "@/lib/DB/schema";
import { productValidator } from "@/lib/validators/productValidator";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs/promises";
import { unlink } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
    // TODO : check user access rights


    const data = await request.formData();

    let validatedData;
    try {
        validatedData = productValidator.parse({
            name: data.get("name"),
            image: data.get("image"),
            description: data.get("description"),
            price: Number(data.get("price")),
        })
    } catch (error) {
        return Response.json({message: error}, {status: 400});
    }

    const fileName = `${Date.now()}.${validatedData.image.name.split('.').slice(-1)}` 

    try {
        const buffer = Buffer.from(await validatedData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(), "public/assets", fileName), buffer)

    } catch (error) {
        console.log(error);
        return Response.json({message: "Failed to save file to fs"}, {status: 500});
    }

    try {
        await db.insert(products).values({ ...validatedData, image: fileName });
    } catch (error) {
        await unlink(path.join(process.cwd(), "public/assets", fileName))
        return Response.json({message: "Failed to insert product into database"}, {status: 400});
    }

    return Response.json({message: "Product created successfully"}, {status: 201}); 
}

export async function GET() {
    try {
        const allProducts = await db.select().from(products).orderBy(desc(products.id));
        return Response.json({products: allProducts}, {status: 201});
    } catch (error) {
        console.log(error);
        return Response.json({message: "Failed to fetch products"}, {status: 500});
    }
    
}