import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.auth.isSignedIn) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="hero flex-1 relative overflow-hidden bg-gradient-to-b from-base-200 to-base-100">
        <div className="hero-content text-center relative z-10 py-0 px-4">
          <div className="max-w-2xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Simply Climbing
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                to="/signup"
                className="btn btn-primary btn-md sm:btn-lg w-full sm:w-auto"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="btn btn-outline btn-md sm:btn-lg w-full sm:w-auto"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
