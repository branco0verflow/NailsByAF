import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Cloudinary no está configurado. Copiá .env.example a .env.local y completá CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET.",
      },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Falta el archivo (field: file)." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const folder = (form.get("folder") as string) || "nails-anto-figueroa/uploads";

  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: false,
      },
      (error, res) => {
        if (error || !res) reject(error);
        else resolve({ secure_url: res.secure_url, public_id: res.public_id });
      }
    );

    stream.end(buffer);
  });

  return NextResponse.json({ ok: true, ...result });
}
