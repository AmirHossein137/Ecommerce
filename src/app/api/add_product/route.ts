import Products from "@/models/Products";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imgSrc, fileKey, name, category, price } = body;

    await connectDB();
    const data = await Products.create({
      imgSrc,
      fileKey,
      name,
      category,
      price,
    });
    return NextResponse.json({ msg: "Product Added Successfully...", data });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, message: "Sometihng Wrong..." },
      { status: 400 }
    );
  }
}
