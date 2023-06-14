import { getJwtSecretKey } from '@/lib/auth'
import { adminProcedure, publicProcedure, router } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import cloudinary from 'cloudinary'
import cookie from 'cookie'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { z } from 'zod'

export const adminRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { res } = ctx
      const { email, password } = input

      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: 'HS256' })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime('1m')
          .sign(new TextEncoder().encode(getJwtSecretKey()))

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('user-token', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
          }),
        )

        return { success: true }
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      })
    }),

  createPresignedUrl: adminProcedure
    .input(z.object({ fileType: z.string() }))
    .mutation(async ({ input }) => {
      const id = nanoid()
      const ex = input.fileType.split('/')[1]
      const key = `${id}.${ex}`

      interface CloudinaryConfig {
        cloud_name: string
        api_key: string
        api_secret: string
      }

      const cloudinaryConfig: CloudinaryConfig = {
        cloud_name: process.env.CLOUD_NAME || '',
        api_key: process.env.CLOUD_KEY || '',
        api_secret: process.env.CLOUD_SECRET || '',
      }

      cloudinary.v2.config(cloudinaryConfig)

      const folder = 'booking-application'
      const preview = 'my_preview'

      const uploadOptions = {
        public_id: key,
        preview,
        folder,
        eager: {
          format: 'jpg',
          transformation: [{ width: 500, height: 500, crop: 'limit' }],
        },
        resource_type: 'auto',
        eager_async: true,
        tags: ['booking-software'],
      }

      // const cloudinaryUploadImg = async (cloudPath: string) => {
      //   return await cloudinary.v2.uploader.upload(cloudPath, {
      //     folder,
      //     preview,
      //   })
      // }

      const { signature, payload } = cloudinary.v2.utils.sign_request(
        uploadOptions,
        process.env.CLOUD_SECRET ? cloudinaryConfig : undefined,
      )

      const url = cloudinary.v2.utils.api_url('upload', {
        api_key: process.env.CLOUD_KEY,
        signature,
      })

      const fields = {
        ...uploadOptions,
        api_key: process.env.CLOUDINARY_API_KEY,
        signature,
        payload,
      }

      console.log('url, fields, key: ', { url, fields, key })

      return { url, fields, key }
    }),

  addMenuItem: adminProcedure
    .input(
      z.object({
        imageKey: z.string(),
        name: z.string(),
        price: z.number(),
        categories: z.array(
          z.union([
            z.literal('breakfast'),
            z.literal('lunch'),
            z.literal('dinner'),
          ]),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, price, imageKey, categories } = input

      const categoryInputs = categories.map((categoryName) => ({
        name: categoryName,
      }))

      const menuItem = await ctx.prisma.menuItem.create({
        data: {
          name,
          price,
          categories: {
            create: categoryInputs,
          },
          imageKey,
        },
      })

      return menuItem
    }),

  // sensitive: adminProcedure.mutation(() => {
  //   return 'sensitive'
  // }),

  // createPresignedUrl: adminProcedure
  //   .input(z.object({ fileType: z.string() }))
  //   .mutation(async ({ input }) => {
  //     const id = nanoid()
  //     const ex = input.fileType.split('/')[1]
  //     const key = `${id}.${ex}`

  //     const { url, fields } = (await new Promise((resolve, reject) => {
  //       s3.createPresignedPost(
  //         {
  //           Bucket: 'youtube-booking-software',
  //           Fields: { key },
  //           Expires: 60,
  //           Conditions: [
  //             ['content-length-range', 0, MAX_FILE_SIZE],
  //             ['starts-with', '$Content-Type', 'image/'],
  //           ],
  //         },
  //         (err, signed) => {
  //           if (err) return reject(err)
  //           resolve(signed)
  //         },
  //       )
  //     })) as any as { url: string; fields: any }

  //     return { url, fields, key }
  //   }),

  // deleteMenuItem: adminProcedure
  //   .input(z.object({ imageKey: z.string(), id: z.string() }))
  //   .mutation(async ({ input, ctx }) => {}),
})
