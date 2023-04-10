import Head from 'next/head'

type HeadProps = {
  title?: string
  description?: string
}

export default function HTMLHead({
  title = 'Meditation Timer',
  description = 'A free web-based meditation timer with three bells to choose from.  Customize delay, interval, and meditation timers.  No ads, no sign-up.'
}: HeadProps): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
