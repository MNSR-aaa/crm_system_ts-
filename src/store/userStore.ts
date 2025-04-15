import { create } from "zustand";
import { BASE_API_URL } from "../constants/api";
import axios from "axios";

interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color?: string;
    type?: string;
  };
  ip?: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
    stateCode?: string;
    postalCode?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
    country?: string;
  };
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire?: string;
    cardNumber?: string;
    cardType?: string;
    currency?: string;
    iban?: string;
  };
  company?: {
    department?: string;
    name?: string;
    title?: string;
    address?: {
      address?: string;
      city?: string;
      state?: string;
      stateCode?: string;
      postalCode?: string;
      coordinates?: {
        lat?: number;
        lng?: number;
      };
      country?: string;
    };
  };
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: {
    coin?: string;
    wallet?: string;
    network?: string;
  };
  role?: string;
}

interface IUseUserStore {
  user: IUser;
  updateUser: any;
  getUserFromToken: any;
}

const useUserStore = create<IUseUserStore>((set) => ({
  user: {},
  updateUser: (newData: object) => {
    set((state) => ({
      user: { ...state.user, ...newData },
    }));
    console.log("newData", newData);
  },
  getUserFromToken: async () => {
    console.log("Hello");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      const res = await axios.get(`${BASE_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set(() => ({
        user: res.data,
      }));
    }
  },
}));

export default useUserStore;
