// nextauth.d.ts
import { DefaultUser } from "next-auth";


interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  /**
   * Agregar cualquier otro campo que tu manejas
   */
}

declare module "next-auth" {
  // User interface is equivalent to IUser, no need to declare it again

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {
    // Add a member to make it distinct from IUser
    accessToken?: string;
  }
}