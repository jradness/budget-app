import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "../../../../../lib/mongodb";
import { Bill } from "../../../../../models/bills";


export async function PUT(req: NextRequest, { params: { id } }: any) {
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

    const {payStartDate, payEndDate} = await req.json(); // Extract the paymentOptions from the request body

    // console.log(payStartDate, payEndDate);
    // Check if paymentOptions exist in the request body
    if (!payStartDate || !payEndDate) {
      return NextResponse.error({
        status: 400,
        message: 'Payment options are required.',
      });
    }

    // Update the paymentOptions for the bill document with the provided id
    const updatedBill = await Bill.findOneAndUpdate(
        { userId: id },
        {
          $set: {
            'paymentOptions.payStartDate': new Date(payStartDate),
            'paymentOptions.payEndDate': new Date(payEndDate),
          }
        },
        { new: true, runValidators: true }
    ).catch(e => console.log('Failed to update bill', e.message));

    if (!updatedBill) {
      return NextResponse.error({
        status: 404,
        message: 'Bill not found.',
      });
    }
    console.log(updatedBill.paymentOptions);
    return NextResponse.json({ updatedBill }, { status: 200 });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}
