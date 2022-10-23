import type { NextApiRequest, NextApiResponse } from 'next'
import {
  DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient  } from '../../../utility/dynamo'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method === 'POST') {
    let tableName = process.env.TABLE_NAME;
    const params = {
      RequestItems: {
        tableName: [{
          PutRequest: {
            Item: {
              HashKey: 'anotherKey',
              NumAttribute: 1,
              BoolAttribute: true,
              ListAttribute: [1, 'two', false],
              MapAttribute: { foo: 'bar' }
            }
          }
        }]
      }
    };
    const response = await ddbDocClient.send(new BatchWriteCommand(params));
    return res.status(201).json(response);
    
  }
  else {
    res.setHeader('Allow', ['POST', 'DELETE'])
    res.status(405).end(`Method Not Allowed`)
  }
}