// server/api/animals/upload.post.ts
import { promises as fs } from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  // Get the FormData from the request
  const formData = await readFormData(event);
  
  // Get the image file from FormData
  const imageFile = formData.get("image") as File | null;
  
  if (!imageFile) {
    throw createError({
      statusCode: 400,
      message: "No image file provided",
    });
  }

  // Convert File to Buffer
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create uploads directory in public folder
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  // Generate safe filename
  const timestamp = Date.now();
  const originalName = imageFile.name || "image";
  const ext = path.extname(originalName);
  const safeName = `${timestamp}-${Math.random().toString(36).substring(2, 9)}${ext}`;
  const filePath = path.join(uploadDir, safeName);

  // Write file to disk
  await fs.writeFile(filePath, buffer);

  console.log(`✅ Image saved: ${filePath}`);

  return {
    url: `/uploads/${safeName}`,
  };
});