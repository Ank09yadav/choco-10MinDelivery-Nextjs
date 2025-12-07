import { db } from '@/lib/db/db';
import { products } from '@/lib/db/schema';
import { productSchema } from '@/lib/validators/productSchema';
import { writeFile, mkdir, unlink } from 'node:fs/promises'; // Import mkdir and unlink
import path from 'node:path';

// ... imports ...

export async function POST(request: Request) {
    const data = await request.formData();

    // ... validation logic (keep as is) ...
    let validateData;
    try {
         // ... (your validation code)
         validateData = productSchema.parse({
            name: data.get('name'),
            image: data.get('image'),
            description: data.get('description'),
            price: Number(data.get('price')),
        });
    } catch (error) {
        return Response.json({ message: error }, {status: 400});
    }

    // FIX 1: Correct Template Literal Syntax
    // Use ${} to evaluate the expression and .pop() to get the extension string
    const fileExtension = validateData.image.name.split('.').pop();
    const filename = `${Date.now()}.${fileExtension}`;

    try {
        const buffer = Buffer.from(await validateData.image.arrayBuffer());
        
        // FIX 2: Define directory and ensure it exists
        const uploadDir = path.join(process.cwd(), 'public/assets', 'uploads');
        
        // This creates the folder if it doesn't exist
        await mkdir(uploadDir, { recursive: true });

        // Now write the file
        await writeFile(path.join(uploadDir, filename), buffer);

    } catch (error) {
        console.error("Upload Error:", error); // Log the actual error to see details in terminal
        return Response.json({ message: 'Image upload failed' }, {status: 500});
    }

    try {
        // ... db insertion logic (keep as is) ...
        await db.insert(products).values({...validateData, image:`/assets/uploads/${filename}`});
    } catch (error) {
        console.error("Database Insertion Error:", error); // Log the actual error
        // ... cleanup logic (keep as is) ...
        await unlink(path.join(process.cwd(),'public/assets','uploads',filename));
        return Response.json({ message: 'Failed to store product into database.' }, {status: 500});
    }

    return Response.json({ message: 'Product created successfully' }, {status: 201});
}