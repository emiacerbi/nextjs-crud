import { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '../../../config/db'
import { ResultSetHeader } from 'mysql2'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return await getProducts(req, res)
    case 'POST':
      return await createProudct(req, res)
    default:
      return res.status(400).send('Method not allowed')
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results = await pool.query('SELECT * FROM product')
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

const createProudct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, price } = req.body

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO product SET ?',
      {
        name,
        description,
        price,
      }
    )

    return res.status(200).json({ ...req.body, id: result.insertId })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
