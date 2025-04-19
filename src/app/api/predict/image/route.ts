import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 400 });
  }
  try {
    const fileBuffer = await file.arrayBuffer();
    if (!fs.existsSync("python/upload")) {
      fs.mkdirSync("python/upload", { recursive: true });
    }
    const filePath = "python/upload/plant.jpg";
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));
    var { stdout } = await execAsync(`py -3.12 python/image_predict.py`);
    const rawRes = stdout
      .trim()
      .split("\n")
      .slice(2)
      .map((line) => line.replace(/\r$/, ""));
    console.log(rawRes[0]);
    const result = JSON.parse(rawRes[0]);

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error processing file" },
      { status: 500 }
    );
  }
}
