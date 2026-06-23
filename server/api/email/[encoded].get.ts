export default defineEventHandler((event) => {
  const { encoded } = getRouterParams(event)
  if (!encoded || typeof encoded !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing encoded parameter' })
  }
  let email: string
  try {
    email = atob(encoded)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid base64' })
  }
  if (!email.includes('@')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email' })
  }
  const mailto = `mailto:${email}`
  setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${mailto}">
  <title>Redirecting...</title>
</head>
<body>
  <script>location.href="${mailto}"</script>
  <p>Redirecting to <a href="${mailto}">${email}</a>...</p>
</body>
</html>`
})
