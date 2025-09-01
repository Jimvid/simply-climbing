import { SignIn } from '@clerk/clerk-react'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,

  // beforeLoad: ({ context }) => {
  //   // if (context.auth.isSignedIn) {
  //   //   throw redirect({
  //   //     to: '/',
  //   //   })
  //   // }
  // },
})

function RouteComponent() {
  return (
    <section className="px-4 py-8 flex justify-center">
      <SignIn signUpUrl="/signup" />
    </section>
  )
}
