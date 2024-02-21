import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFetch } from '../_helpers/client/useFetch';
import { config } from '../../constants';

// interfaces
interface IUser {
  id?: string,
  username: string,
  email: string,
}

interface IBill {
  userId: string,
  name: string,
  dueDayOfMonth: number,
  billAmount: number,
}

interface IUserStore {
  user?: IUser,
  currentUser?: IUser,
  bills?: IBill
}

interface IUserService extends IUserStore {
  register: (user: Object) => Promise<void>,
  getAuthUser: (email: string) => Promise<void>,
}

// users state store
const initialState = {
  currentUser: undefined,
};

const userStore = create<IUserStore>(() => initialState);

function useUserService(): IUserService {
  const fetch = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = userStore();

  return {
    currentUser,
    getAuthUser: async (email) => {
      const { user } = await fetch.get(`${config.baseUrl}/api/users/current?email=${email}`);
      userStore.setState({ currentUser: user });
    },
    register: async (userData) => {
      const { user } = await fetch.post(`${config.baseUrl}/api/auth/register`, userData);
      userStore.setState({ currentUser: user });
    }
  }
}

export { useUserService };
