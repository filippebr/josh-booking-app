import { publicProcedure, router } from '@/server/trpc'
import cloudinary from 'cloudinary'

// sleep
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const menuRouter = router({
  getMenuItems: publicProcedure.query(async ({ ctx }) => {
    const menuItems = await ctx.prisma.menuItem.findMany()

    // Each menu item only contains its Cloudinary public_id. Extend all items with their actual image URLs
    const withUrls = await Promise.all(
      menuItems.map(async (menuItem) => {
        const url = cloudinary.v2.url(menuItem.id, {
          width: 500,
          height: 500,
          crop: 'limit',
          resource_type: 'auto',
        })

        return {
          ...menuItem,
          url,
        }
      }),
    )

    return withUrls
  }),
})
