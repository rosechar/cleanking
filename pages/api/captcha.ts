import type { NextApiRequest, NextApiResponse } from 'next'

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { token },
    method,
  } = req

  if (method === 'GET') {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {method: "POST"});
    const data = await response.json();

    if (!data.success) {
      return res.status(400).end();
    }
    return res.status(200).end();
  }
  else {
      res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
