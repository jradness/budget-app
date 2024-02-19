import connectMongoDB from "../../../../lib/mongodb";
import {User} from "../../../../models/user";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params.json();
    // Fetch user data based on the ID
    await connectMongoDB();
    const user = await User.findOne({_id: id});
    // Return the user data in the response
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    // Handle any errors and return an appropriate response
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

