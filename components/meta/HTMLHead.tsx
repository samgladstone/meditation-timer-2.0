import Head from 'next/head'

type HeadProps = {
  title?: string
  description?: string
}

export default function HTMLHead({
  title = 'Free Online Meditation Timer',
  description = 'A free web-based meditation timer with three bells to choose from.  Customize delay, interval, and meditation timers. Choose light or dark mode. No ads, no sign-up.'
}: HeadProps): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  )
}
