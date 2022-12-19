// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '../../config/db'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const [rows] = await pool.query('SELECT NOW()')
  console.log(rows)
  res.status(200).json({ name: 'John Doe' })
}
