import BuyButton from "./payment/BuyButton"

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-10">
      <h1 className="text-2xl font-semibold mb-10">Lockbase demo: purchase a license</h1>
      <BuyButton />
    </main>
  )
}
