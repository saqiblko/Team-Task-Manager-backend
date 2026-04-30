declare module "*";
declare module "../../Api/auth" {
  export const logout: any;
}

declare module "../../Api/settings" {
  export const getSettings: any;
}

declare module "../../config" {
  export const BASE_URL: string;
}

declare module "../Api/auth" {
  export const logout: any;
}

declare module "./App.jsx" {
  const App: any;
  export default App;
}

declare module "../../components/auth/SignUpForm" {
  const SignUpForm: any;
  export default SignUpForm;
}