import Products from "@/models/Products";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, URLParams: any) {
  try {
    const body = await request.json();
    const id = URLParams.params.id;
    const { name, category, price } = body;

    await connectDB();
    const data = await Products.findByIdAndUpdate(id, {
      name,
      category,
      price,
    });
    return NextResponse.json({ msg: "Updated Successfully", data });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, message: "Sometihng Wrong..." },
      { status: 400 }
    );
  }
}
