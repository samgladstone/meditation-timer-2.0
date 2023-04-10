import MeditationTimer from '../components/home/MeditationTimer'
import Layout from '@/components/layout/Layout'

export default function Home() {
  return (
    <Layout>
      <main className="bg-sky-50 dark:bg-black min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]">
        <section className="py-12">
          <div className="container">
            <MeditationTimer />
          </div>
        </section>
      </main>
    </Layout>
  )
}
