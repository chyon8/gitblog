import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const post = await Blog.findById(id).populate('user');

    if (!post) {
      return NextResponse.json({ message: "post not found" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
