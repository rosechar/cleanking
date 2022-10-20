import { ScanCommand } from  "@aws-sdk/lib-dynamodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { ddbDocClient  } from '../../../utility/dynamo'
import { validateHuman } from "../../../utility/recaptcha";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);
  const {
    query: { email, token },
    method,
  } = req
  const session = await unstable_getServerSession(req, res, authOptions);
  const isHuman = await validateHuman(token);
  if (!isHuman) {
    res.status(400);
    return;
  }

  if (method === 'GET') {
      const params = {
        TableName: process.env.TABLE_NAME,
        IndexName: "email-index",
        FilterExpression:"email = :email",
        ExpressionAttributeValues: {
          ":email": email,
      }
      };
      const { Items } = await ddbDocClient.send(new ScanCommand(params));
      res.status(200).json(Items);
  }
  else {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
