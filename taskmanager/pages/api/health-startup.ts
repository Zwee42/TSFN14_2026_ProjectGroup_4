import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Startup probe - bara returnera 200 när servern har startat
  console.log(`[Health] Startup OK`);
  res.status(200).json({ status: 'startup ok' });
}