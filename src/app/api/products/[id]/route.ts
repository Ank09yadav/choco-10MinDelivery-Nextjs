import { db } from "@/lib/DB/db";
import { products } from "@/lib/DB/schema";
import { eq } from "drizzle-orm";
import { productValidator } from "@/lib/validators/productValidator";
import path from "path";
import { unlink, writeFile } from "node:fs/promises";

export async function GET(request: Request, {params} : { params: Promise<{ id: string }> } ) {
    
    const id =  (await params).id;

    try {
        const product = await db.select().from(products).where(eq(products.id, Number(id))).limit(1);
    
        if(product.length === 0) {
            return Response.json({message: "Product not found"}, {status: 404});
        }
        
        return Response.json(product[0], {status: 201});
    } catch (error) {
        return Response.json({message: "Failed to fetch product"}, {status: 500});
    }
} 

//delete a product 
export async function DELETE(request: Request,{params}:{params:Promise<{id:string}>}) {
    const id = (await params).id;
    try {
        await db.delete(products).where(eq(products.id,Number(id)));
        return Response.json({message:"product deleted successfully"},{status:200});
        
    } catch (error) {
        return Response.json({message:"Failed to delete product"},{status:500});
    }
    
}
//update a product 
export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){
    const id = (await params).id;
    const body = await request.formData();
    let validatedData;

    try {
        try {
            validatedData = productValidator.parse(body);
        } catch (error) {
            return Response.json({message:"Invalid product data"},{status:400});
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
        const updateProduct = await db.update(products).set({
            name: validatedData.name,
            description: validatedData.description,
            price: validatedData.price,
            image: fileName,
        }).where(eq(products.id, Number(id)));
        return Response.json({message:"Product updated successfully"},{status:200});
        

    } catch (error) {
        return Response.json({message:"Failed to update product"},{status:500});
    }
   
}