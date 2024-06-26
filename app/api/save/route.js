import User from "@/models/User";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const session = await getServerSession()
    const email = session.user.email
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    const userId = user._id.toString()
    const body = await req.json();
    
    let blog;

    if (body.blogId) {
      // If blogId is provided, find and update the existing blog
      blog = await Blog.findByIdAndUpdate(
        body.blogId,
        { $set: { post: body.post } },
        { new: true }
      );

      if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }
    } else {
      // If no blogId is provided, create a new blog
      blog = await Blog.create({
        post: body.post,
        user: userId
      });

      console.log(blog._id.toString())

    }

    return NextResponse.json({ message: "Blog created or updated", blogId:blog._id.toString() }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}