export interface User {
    id?: number;
    firstName:string;
    lastName:string;
    email:string;
    username: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
  }
  