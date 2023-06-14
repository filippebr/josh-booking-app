import { s3 } from '@/lib/s3'
import { publicProcedure, router } from '@/server/trpc'

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
})
