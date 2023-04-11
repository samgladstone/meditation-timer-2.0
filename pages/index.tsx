import dynamic from 'next/dynamic'
const MeditationTimer = dynamic(
  () => import('../components/home/MeditationTimer'),
  { ssr: false }
)
import Layout from '@/components/layout/Layout'

export default function Home() {
  return (
    <Layout>
      <section className="py-8 relative z-10">
        <div className="container">
          <MeditationTimer />
        </div>
      </section>
      <div className="bg-sky-50/85 dark:bg-black/70 absolute inset-0 h-full w-full "></div>
    </Layout>
  )
}
