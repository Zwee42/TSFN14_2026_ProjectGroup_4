import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Liveness probe - alltid OK om servern lever
  console.log(`[Health] Liveness OK`);
  res.status(200).json({ status: 'alive' });
}