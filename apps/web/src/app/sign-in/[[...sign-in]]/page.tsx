import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-accent">C</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Comp-Dash</h1>
          <p className="text-gray-500 mt-1">Sign in to your admin dashboard</p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
