import { create } from 'zustand';
import { useUserService } from "./useUserService";
import { useFetch } from '../_helpers/client/useFetch';
import { config } from '../../constants';

// interfaces
interface IUser {
  id: string,
}

interface IBill {
  userId: string,
  name: string,
  dueDayOfMonth: number,
  billAmount: number,
}

interface IBillStore {
  currentUser?: any,
  monthlyBills?: IBill[],
  paymentOptions?: Object,
  financialDetails: Object,
  expenseCategories: Object[],
}

interface IBillsService extends IBillStore {
  getUserBillData: () => Promise<void>,
  handleBill: (userId: Object) => Promise<void>,
  deleteBill: (userId: String) => Promise<void>,
  updatePaymentDates: (payStartDate: string, payEndDate: string) => Promise<void>,
  updateFinancialDetails: (financialDetails: Object) => Promise<void>,
  addExpense: (expenseItem: Object) => Promise<void>,
  updateExpense: (expenseItem: Object) => Promise<void>,
  deleteExpense: (expenseItemId: String) => Promise<void>,
}

// bill state store
const initialState = {
  currentUser: undefined,
  monthlyBills: [],
  paymentOptions: {},
  financialDetails: {},
  expenseCategories: [],
};

const billsStore = create<IBillStore>(() => initialState);

function useBillService(): IBillsService {
  const fetch = useFetch();
  const {
    monthlyBills,
    paymentOptions,
    financialDetails,
    expenseCategories
  } = billsStore();

  const { currentUser } = useUserService();

  const fetchBillDetails = async (userId: string) => {
    try {
      const { billDoc: {
          monthlyBills,
          paymentOptions,
          financialDetails,
          expenseCategories
        }
      } = await fetch.get(`${config.baseUrl}/api/bills/${userId}`);

      billsStore.setState({
        monthlyBills,
        paymentOptions,
        financialDetails,
        expenseCategories,
      });
    } catch (error) {
      console.error('Error fetching bill doc:', error);
    }
  };

  return {
    currentUser,
    monthlyBills,
    paymentOptions,
    financialDetails,
    expenseCategories,
    getUserBillData: async () => await fetchBillDetails(currentUser?._id),
    handleBill: async (bill) => {
      const { billDoc } = await fetch.put(`${config.baseUrl}/api/bills/${currentUser._id}/monthly`, bill);
      console.log(billDoc.monthlyBills[1]);
      billsStore.setState({ monthlyBills: billDoc.monthlyBills});
    },
    deleteBill: async (bill) => {
      const { billDoc } = await fetch.delete(`${config.baseUrl}/api/bills/${currentUser._id}/monthly`, bill);
      billsStore.setState({ monthlyBills: billDoc.monthlyBills});
    },
    updatePaymentDates: async (payStartDate: string, payEndDate: string) => {
      const paymentOptions = {
        payStartDate,
        payEndDate
      }
      await fetch.put(`${config.baseUrl}/api/bills/${currentUser._id}/doc`, {paymentOptions});
      billsStore.setState({ paymentOptions });
    },
    updateFinancialDetails: async (financialDetails) => {
      await fetch.put(`${config.baseUrl}/api/bills/${currentUser._id}/doc`, {financialDetails});
      billsStore.setState({ financialDetails });
    },
    addExpense: async (expenseItem) => {
      const { billDoc } = await fetch.put(`${config.baseUrl}/api/bills/${currentUser._id}/doc`, {expenseItem});
      billsStore.setState({ expenseCategories: billDoc.expenseCategories });
    },
    updateExpense: async (expenseItem) => {
      const { billDoc } = await fetch.put(`${config.baseUrl}/api/bills/${currentUser._id}/doc`, {expenseItem});
      billsStore.setState({ expenseCategories: billDoc.expenseCategories });
    },

    deleteExpense: async (expenseItem) => {
      const { billDoc } = await fetch.delete(`${config.baseUrl}/api/bills/${currentUser._id}/doc`, expenseItem);
      billsStore.setState({ expenseCategories: billDoc.expenseCategories });
    },
  }
}

export { useBillService }
