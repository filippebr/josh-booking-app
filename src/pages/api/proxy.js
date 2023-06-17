export default async function handler(req, res) {
  // Extract the input and init from the request body
  const { input, init } = await req.json()

  try {
    // Make the request to the Cloudinary API
    const cloudinaryRes = await fetch(
      'https://api.cloudinary.com/v1_1/' +
        process.env.CLOUD_NAME +
        '/auto/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers here
        },
        body: JSON.stringify({ input, init }),
      },
    )

    const responseBody = await cloudinaryRes.json()

    // Extract the response body
    res.status(cloudinaryRes.status).json(responseBody)
  } catch (error) {
    console.error('Error proxying request:', error)
    res.status(500)
    res.json({ error: 'Internal server error' })
  }
}
