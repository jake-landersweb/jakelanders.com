import type { NextApiRequest, NextApiResponse } from 'next'

// export default function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Data>
// ) {
//     res.status(200).json({ name: 'John Doe' })
// }
// <ApiResponse<PageData>>

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch(process.env.HOST!.toString() + "/posts", {
        method: "POST",
        headers: [["Content-Type", "application/json"], ["x-api-key", process.env.KEY!.toString()]],
        body: JSON.stringify(req.body),
    })
    console.log(response)

    res.status(response.status).json(response)
}
