import { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '../../../config/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return await getTask(req, res)
    case 'DELETE':
      return await deleteProduct(req, res)
    case 'PUT':
      return await updateProduct(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getTask = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await pool.query('SELECT * FROM product WHERE id = ?', [
      req.query.id,
    ])
    return res.status(200).json(result[0])
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await pool.query('DELETE FROM product WHERE id = ?', [
      req.query.id,
    ])
    return res.status(204).json({ message: result })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body)
    const response = await pool.query('UPDATE product SET ? WHERE id = ?', [
      req.body,
      req.query.id,
    ])

    console.log(response)
    return res.status(204).json(response)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
