import { type AppType } from 'next/app'

import { trpc } from 'src/utils/trpc'

import '@/styles/Calendar.css'
import '@/styles/globals.css'
import '@/styles/Spinner.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
