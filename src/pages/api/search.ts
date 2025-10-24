// Redirect to the versioned API endpoint
export const GET = async ({ url }) => {
  const newUrl = new URL(url)
  newUrl.pathname =
    '/api/v1/search' + newUrl.pathname.substring('/api/search'.length)

  return new Response(null, {
    status: 308, // Permanent redirect
    headers: {
      Location: newUrl.toString(),
    },
  })
}
