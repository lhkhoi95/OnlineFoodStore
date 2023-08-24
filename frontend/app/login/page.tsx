import { GoogleSignInButton } from "../components/GoogleSignInButton";
import { CredentialsForm } from "../components/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-[#1F2937] dark:border-gray-700">
        <CredentialsForm />
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="mx-12 w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1F2937] text-slate-300">Or continue with</span>
          </div>
        </div>
        <GoogleSignInButton />
      </div>
    </div>
  )
}
