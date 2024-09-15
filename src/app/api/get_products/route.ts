import Products from "@/models/Products";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const data = await Products.find();
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, message: "Sometihng Wrong..." },
      { status: 400 }
    );
  }
}
