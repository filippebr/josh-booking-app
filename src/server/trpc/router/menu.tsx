import { s3 } from '@/lib/s3'
import { publicProcedure, router } from '@/server/trpc'

// sleep
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const menuRouter = router({
  getMenuItems: publicProcedure.query(async ({ ctx }) => {
    const menuItems = await ctx.prisma.menuItem.findMany()

    // Each menu item only contains its AWS key. Extend all items with their actually img url
    const withUrls = await Promise.all(
      menuItems.map(async (menuItem) => ({
        ...menuItem,
        url: await s3.getSignedUrlPromise('getObject', {
          Bucket: 'youtube-implementation',
          Key: menuItem.imageKey,
        }),
      })),
    )

    return withUrls
  }),

  checkMenuStatus: publicProcedure.mutation(async () => {
    // Handle menu checking logic
    await sleep(1000)

    return { success: true }
  }),
})
