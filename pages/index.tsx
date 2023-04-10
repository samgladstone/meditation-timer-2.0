import MeditationTimer from '../components/home/MeditationTimer'
import Layout from '@/components/layout/Layout'

export default function Home() {
  return (
    <Layout>
      <section className="py-8">
        <div className="container">
          <MeditationTimer />
        </div>
      </section>
    </Layout>
  )
}
