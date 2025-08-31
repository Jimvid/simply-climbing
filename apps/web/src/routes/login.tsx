import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="p-4">
      <h1 className="text-2xl mb-2">Login</h1>
      <form className="flex flex-col gap-2 items-center justify-center">
        <input type="text" className="input w-full" placeholder="Email..." />
        <input
          type="password"
          className="input w-full"
          placeholder="Password..."
        />
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </section>
  )
}
