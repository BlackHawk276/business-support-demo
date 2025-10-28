export interface User {
  id: string
  email: string
  name: string
  role: "owner" | "manager" | "sales_rep"
  company: Company
  avatar?: string | null
}

export interface Company {
  id: string
  name: string
}

export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}
