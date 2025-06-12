import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const prisma = new PrismaClient();

// GET /api/projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data project." },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const kode = formData.get("kode")?.toString() || "";
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const website = formData.get("website")?.toString() || "";
    const video = formData.get("video")?.toString() || "";
    const file = formData.get("image") as File;

    if (!kode) {
      return NextResponse.json({ error: "Kode wajib diisi." }, { status: 400 });
    }

    // Upload image
    let imagePath = "";
    if (file && "arrayBuffer" in file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      await writeFile(path.join(uploadDir, filename), buffer);
      imagePath = `/uploads/${filename}`;
    }

    const newProject = await prisma.project.create({
      data: {
        kode,
        title,
        description,
        website,
        video,
        image: imagePath,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan project." },
      { status: 500 }
    );
  }
}
