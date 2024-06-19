
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';



export async function POST(req) {


  try {
    const body = await req.json();
    const { productId, name } = body;


    const result = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { social2: name } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(result.value, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  }
}
