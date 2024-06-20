import Product from "@/models/Product";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const type = searchParams.get('type')?.split(',') || [];
    const category = searchParams.get('category')?.split(',') || [];


    const query = { status: 'public' };

    // Add filter conditions only if filters are provided
    if (type.length > 0 && type[0] !== '') {
      query.type = { $in: type };
    }
    if (category.length > 0 && category[0] !== '') {
      query.category = { $in: category };
    }

    const totalCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const products = await Product.find(query)
      .sort({ createdAt: 'desc' })
      .populate('user')
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(
      {
        products,
        page,
        totalPages,
        totalCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("An error occurred while fetching products:", err);
    return NextResponse.json({ message: "Error fetching products", error: err.message }, { status: 500 });
  }
}
