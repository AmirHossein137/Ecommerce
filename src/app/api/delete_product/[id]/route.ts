import Products from "@/models/Products";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, URLParams: any) {
  try {
    const id = URLParams.params.id;
    console.log(id);
    await connectDB();
    await Products.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Product Deleted Successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, message: "Sometihng Wrong..." },
      { status: 400 }
    );
  }
}
