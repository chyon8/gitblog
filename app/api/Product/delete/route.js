
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function DELETE(req) {
  try {
    console.log(req.body)

    const productId  = await req.json(); 

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", error: err.message }, { status: 500 });
  }
}
