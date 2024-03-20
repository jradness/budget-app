import { create } from 'zustand';
import { useFetch } from '@helpers/client/useFetch';
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
  deleteUser: (id: string) => Promise<void>,
}

// users state store
const initialState = {
  currentUser: undefined,
};

const userStore = create<IUserStore>(() => initialState);

function useUserService(): IUserService {
  const fetch = useFetch();
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
    },
    deleteUser: async (authId) => {
      await fetch.delete(`${config.baseUrl}/api/users/${currentUser?._id}?auth_id=${authId}`);
    }
  }
}

export { useUserService };
