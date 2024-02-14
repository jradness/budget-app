import connectMongoDB from "../../../../lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';
import { User } from "../../../../models/user";

export async function GET(req: NextRequest, { params: { id } }: any) {
  try {
    await connectMongoDB();
    const user = await User.findOne({_id: id});
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}

export async function PUT(req: NextRequest, { params: { id } }: any) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: any) {
  try {
    await connectMongoDB();
    const user = await User.findByIdAndDelete(id);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}

