import type { NextApiRequest, NextApiResponse } from 'next'
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient  } from '../../utility/dynamo'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const params = {
      TableName: process.env.TABLE_NAME
    };
    
    const { Items } = await ddbDocClient.send(
      new ScanCommand(params)
    );
    
    return res.status(200).json(Items);
  }
}