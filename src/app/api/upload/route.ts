import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { saveUpload } from "@/lib/store";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const allowed = ["image/png", "image/jpeg", "image/jpg", "video/mp4", "video/quicktime", "application/pdf"];
  if (file.type && !allowed.includes(file.type) && !file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    return NextResponse.json({ error: `Unsupported type: ${file.type}` }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > 80 * 1024 * 1024) {
    return NextResponse.json({ error: "Max 80MB" }, { status: 400 });
  }

  const media = await saveUpload(user.id, {
    name: file.name,
    type: file.type || "application/octet-stream",
    buffer,
  });

  return NextResponse.json({ media });
}
