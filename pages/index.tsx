import Header from '@/components/layout/Header'
import HTMLHead from '@/components/meta/head'

export default function Home() {
  return (
    <>
      <HTMLHead />
      <Header />
      <main className="bg-sky-50 dark:bg-black min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]"></main>
    </>
  )
}
