import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  paymentOptions: {
    payStartDate: {
      type: Date,
      required: true,
      default: new Date(new Date().getFullYear(), 0, 4),
    },
    payEndDate: {
      type: Date,
      required: true,
      default: new Date(new Date().getFullYear(), 11, 19),
    }
  },
  financialDetails: {
    annualIncome: {
      type: Number,
      required: false,
      default: 0,
    },
    payDayAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    paymentSchedule: {
      type: String,
      enum: ['weekly', 'bi-weekly', 'bi-monthly', 'monthly', 'yearly'],
      required: [true, 'Please specify a payment schedule'],
      default: 'bi-weekly'
    },
  },
  expenseCategories: [{
    name: {
      type: String,
      required: [true, 'Please add an expense name. (i.e. grocery budget, savings, donations, etc'],
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Please add an expense amount'],
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  monthlyBills: [{
    name: {
      type: String,
      required: [true, 'Please add a bill name'],
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    dueDayOfMonth: {
      type: Number,
      required: [true, 'Please add a dueDate']
    },
    billAmount: {
      type: Number,
      required: [true, 'Please add an amount']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
});


BillSchema.path('monthlyBills').validate(function(bills) {
  if (!Array.isArray(bills)) {
    return false; // Reject if monthlyBills is not an array
  }

  if (bills.length === 0) {
    return true; // Allow empty array
  }

  for (const bill of bills) {
    if (!bill.name || !bill.dueDayOfMonth || !bill.billAmount) {
      return false; // Reject if any bill is missing required fields
    }
  }

  return true; // Return true if validation passes
}, 'All bills must have a name, dueDayOfMonth, and billAmount');

export const Bill = mongoose.models.Bill || mongoose.model('Bill', BillSchema);
