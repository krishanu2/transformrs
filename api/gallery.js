import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM gallery_photos ORDER BY sort_order, id`
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { image_data, caption, service, detail } = req.body
      if (!image_data) return res.status(400).json({ error: 'image_data is required' })
      const [maxRow] = await sql`SELECT COALESCE(MAX(sort_order), -1) AS max FROM gallery_photos`
      const [row] = await sql`
        INSERT INTO gallery_photos (image_data, caption, service, detail, sort_order)
        VALUES (${image_data}, ${caption || ''}, ${service || ''}, ${detail || ''}, ${maxRow.max + 1})
        RETURNING *
      `
      return res.status(201).json(row)
    }

    if (req.method === 'PUT') {
      const { id, caption, service, detail } = req.body
      if (!id) return res.status(400).json({ error: 'id is required' })
      const [row] = await sql`
        UPDATE gallery_photos
        SET caption = COALESCE(${caption}, caption),
            service = COALESCE(${service}, service),
            detail = COALESCE(${detail}, detail)
        WHERE id = ${id}
        RETURNING *
      `
      return res.status(200).json(row)
    }

    if (req.method === 'DELETE') {
      const id = req.query.id
      if (!id) return res.status(400).json({ error: 'id is required' })
      await sql`DELETE FROM gallery_photos WHERE id = ${id}`
      return res.status(204).end()
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
