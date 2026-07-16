import { neon } from '@neondatabase/serverless'

let sql
try {
  sql = neon(process.env.DATABASE_URL)
} catch (err) {
  console.error('Failed to initialize database client:', err)
}

export default async function handler(req, res) {
  if (!sql) return res.status(500).json({ error: 'Database is not configured' })

  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM price_tiers ORDER BY program_key, sort_order`
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { program_key, tier_label } = req.body
      if (!program_key || !tier_label) {
        return res.status(400).json({ error: 'program_key and tier_label are required' })
      }
      const [maxRow] = await sql`SELECT COALESCE(MAX(sort_order), -1) AS max FROM price_tiers WHERE program_key = ${program_key}`
      const [row] = await sql`
        INSERT INTO price_tiers (program_key, tier_label, sort_order)
        VALUES (${program_key}, ${tier_label}, ${maxRow.max + 1})
        RETURNING *
      `
      return res.status(201).json(row)
    }

    if (req.method === 'PUT') {
      const { id, tier_label, original_price_cents, price_cents, is_free } = req.body
      if (!id) return res.status(400).json({ error: 'id is required' })
      const [row] = await sql`
        UPDATE price_tiers
        SET tier_label = COALESCE(${tier_label}, tier_label),
            original_price_cents = ${original_price_cents},
            price_cents = ${price_cents},
            is_free = ${is_free ?? false},
            updated_at = now()
        WHERE id = ${id}
        RETURNING *
      `
      return res.status(200).json(row)
    }

    if (req.method === 'DELETE') {
      const id = req.query.id
      if (!id) return res.status(400).json({ error: 'id is required' })
      await sql`DELETE FROM price_tiers WHERE id = ${id}`
      return res.status(204).end()
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
