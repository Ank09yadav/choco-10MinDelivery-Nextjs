import { db } from "@/lib/DB/db";
import { products } from "@/lib/DB/schema";
import { productValidator } from "@/lib/validators/productValidator";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs/promises";
import { unlink } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
    // TODO : check user access rights

    try {
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
            return Response.json({ message: error }, { status: 400 });
        }

        const imageFile = validatedData.image as File;
        const fileName = `${Date.now()}.${imageFile.name.split('.').slice(-1)}`

        try {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            await writeFile(path.join(process.cwd(), "public/assets", fileName), buffer)

        } catch (error: any) {
            console.log("File Write Error:", error);
            return Response.json({ message: `Failed to save file to fs: ${error.message}` }, { status: 500 });
        }

        try {
            await db.insert(products).values({ ...validatedData, image: fileName });
        } catch (error: any) {
            await unlink(path.join(process.cwd(), "public/assets", fileName)).catch(() => { });
            return Response.json({ message: `Failed to insert product into database: ${error.message}` }, { status: 400 });
        }

        return Response.json({ message: "Product created successfully" }, { status: 201 });
    } catch (e: any) {
        console.error("Global POST Error: ", e);
        return Response.json({ message: `Internal Server Error: ${e.message}`, stack: e.stack }, { status: 500 });
    }
}

export async function GET() {
    try {
        const allProducts = await db.select().from(products).orderBy(desc(products.id));
        return Response.json({ products: allProducts }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Failed to fetch products" }, { status: 500 });
    }

}