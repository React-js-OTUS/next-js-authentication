import { authConfig } from "@/configs/auth";
import NextAuth from "next-auth"; // импортируем содержимое библиотеки

const handler = NextAuth(authConfig); // добавляем конфиг

export { handler as GET, handler as POST };
