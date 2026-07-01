export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),  // << stringify here
    })

    const data = await backendRes.json()

    if (!backendRes.ok) {
      return res.status(backendRes.status).json({ message: data.message || 'Backend error' })
    }

    return res.status(201).json(data)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
