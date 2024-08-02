import type { AuthOptions, User } from "next-auth";
import GoggleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { users } from "@/data/users";

export const authConfig: AuthOptions = {
  providers: [
    // в обязательном порядке, набор настроек
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // извлекаем значения из глобальных переменных
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const currentUser = users.find( // взаимодействие с БД
          (user) => user.email === credentials.email
        );

        if (currentUser && currentUser.password === credentials.password) { // если пользователь найден
          const { password, ...userWithoutPass } = currentUser; // изымаем пароль пользователя

          return userWithoutPass as User;
        }

        return null; // возвращаем null если проверка не прошла, такого пользователя не сущесвтует
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
