
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

      if (user.credits <= 0) {
        return NextResponse.json({ message: "Not enough credits" }, { status: 403 });
      }
  
      user.credits -= 1;
      await user.save();
  
    
   
    return NextResponse.json({},
       { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}


