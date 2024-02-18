import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "../../../../../lib/mongodb";
import { Bill } from "../../../../../models/bills";

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

export async function PUT(req: NextRequest, { params: { id }}) {
  try {
    await connectMongoDB();
    let doc = await Bill.findOne({userId: id});
    if (!doc) {
      console.error('User Bill collection not found');
      return NextResponse.error({
        status: 404,
        message: 'User Bill collection not found'
      });
    }
    const data = await req.json();

    if (!doc.monthlyBills.id(data._id)) {
      doc.monthlyBills.push(data);
    } else {
      const billIndex = doc.monthlyBills.findIndex(bill => bill._id.equals(data._id));
      if (billIndex !== -1) {
        doc.monthlyBills[billIndex] = { ...doc.monthlyBills[billIndex], ...data };
      }
    }

    const billDoc = await doc.save();
    return NextResponse.json({ billDoc }, { status: 200 });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}

export async function DELETE(req: NextRequest, { params: { id }}) {
  try {
    await connectMongoDB();
    const data = await req.json();

    const doc = await Bill.findOne({ userId: id });
    doc.monthlyBills.pull({_id: data._id}); // Remove the bill from the bills array
    const billDoc = await doc.save();

    return NextResponse.json({ billDoc }, { status: 200 });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}
