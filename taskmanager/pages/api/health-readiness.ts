import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Här kan du göra riktiga readiness checks (DB, cache osv)
  const ready = true; 

  if (ready) {
    console.log(`[Health] Readiness OK`);
    res.status(200).json({ status: 'ready' });
  } else {
    console.log(`[Health] Readiness NOT OK`);
    res.status(503).json({ status: 'not ready' });
  }
}