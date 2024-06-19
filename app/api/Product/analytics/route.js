
import { NextResponse } from "next/server";
import Analytics from "@/models/Analytics";

export const dynamic = 'force-dynamic';



export async function POST(req) {
  try {
    const body = await req.json();

 await Analytics.create(body)

     
    return NextResponse.json({body},
       { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}


