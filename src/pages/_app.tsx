import '@/styles/Calendar.css'
import '@/styles/globals.css'
import '@/styles/Spinner.css'
import { type AppType } from 'next/app'
import { trpc } from 'src/utils/trpc'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
