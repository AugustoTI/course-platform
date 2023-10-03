import { UserButton } from '@clerk/nextjs'

export default function HomePage() {
  return (
    <>
      <p>This is an protected page</p>
      <UserButton afterSignOutUrl="/" />
    </>
  )
}
