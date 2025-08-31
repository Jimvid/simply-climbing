import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="p-4">
      <h1 className="text-2xl mb-2">Sign up</h1>
      <form className="mb-12 flex flex-col gap-2 items-center justify-center">
        <input type="text" className="input w-full" placeholder="First name" />
        <input type="text" className="input w-full" placeholder="Last name" />
        <input type="text" className="input w-full" placeholder="Email" />
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
        />
        <input
          type="password"
          className="input w-full"
          placeholder="Confirm password"
        />
        <button type="submit" className="btn btn-primary w-full">
          Sign up
        </button>
      </form>
      <h2 className="text-lg text-center mb-4">Or sign up with</h2>
      <div className="flex gap-4">
        <button className="btn btn-soft btn-secondary flex-1">Google</button>
        <button className="btn btn-soft btn-primary flex-1">Facebook</button>
      </div>
    </section>
  )
}
