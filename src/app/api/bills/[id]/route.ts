import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "../../../../lib/mongodb";
import {Bill} from "../../../../models/bills";

export async function GET(req: NextRequest, { params: { id } }: any) {
  try {
    await connectMongoDB();
    const billDoc = await Bill.findOne({userId: id});

    return NextResponse.json({ billDoc }, { status: 200 });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}
