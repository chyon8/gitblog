
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
      
    const userId= user._id.toString()

    const body = await req.json();
    //const { productId, name } = body;

    const form = {post:body.post,user:userId}

      


 await Blog.create(form)

     
   
    return NextResponse.json({},
       { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}


