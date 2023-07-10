import { authApi } from "@/lib/axios";

export const useAuth = () => ({
  validadeToken: async (token: string) => {
    // return {
    //   user: { id: 3, name: "Matheus", email: "matheus@gmail.com" },
    // };
    const response = await authApi.post("/validade", { token });
    return response.data;
  },
  signin: async (name: string, email: string, password: string) => {
    return {
      user: { id: 3, name: "Matheus", email: "matheus@gmail.com" },
      token: "123456",
    };
    const response = await authApi.post("/signin", { email, password });
    return response.data;
  },
  logout: async () => {
    return { status: true };
    const response = await authApi.post("/logout");
    return response.data;
  },
});
