import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "@lib/mongodb";
import {User} from "@models/user";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email') as string;
    await connectMongoDB();
    const user = await User.findOne({ email });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

