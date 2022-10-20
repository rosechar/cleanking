import type { NextApiRequest, NextApiResponse } from 'next'
import {
  DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { add, formatISO } from 'date-fns';


const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  },
  region: process.env.REGION
});
const ddbDocClient = DynamoDBDocumentClient.from(client); 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'GET') {
    const params = {
      TableName: process.env.TABLE_NAME,
      FilterExpression:"apt >= :from AND apt <= :to",
      ExpressionAttributeValues: {
        ":from": formatISO(new Date(Date.now())),
        ":to": formatISO(add(new Date(Date.now()), { days: 30 }))
    },
        ProjectionExpression: "apt"
    };
    const { Items } = await ddbDocClient.send(new ScanCommand(params));
    return res.status(200).json(Items);
    
  }
}