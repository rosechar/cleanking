import type { NextApiRequest, NextApiResponse } from 'next'
import {
  DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import { PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient  } from '../../../utility/dynamo'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method === 'POST') {
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: req.body.id,
        apt: req.body.apt,
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        phone: req.body.phone,
        appointment: req.body.appointment,
        details: req.body.details
      }
    };
    const response = await ddbDocClient.send(new PutCommand(params));
    return res.status(201).json(response);
    
  }
  else if (req.method === 'PUT') {
  const deleteParams = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: req.body.id,
      apt: req.body.oldApt
    }
  };
  try {
    const deleteResponse = await ddbDocClient.send(new DeleteCommand(deleteParams));
  } catch (err) {
    console.log("Error", err);
  }
  const putParams = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: req.body.id,
        apt: req.body.apt,
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        phone: req.body.phone,
        appointment: req.body.appointment,
        details: req.body.details
      }
    };
    try {
      const putResponse = await ddbDocClient.send(new PutCommand(putParams));
      return res.status(201).json(putResponse);
    } catch (err) {
      console.log("Error", err);
    }
    
    
  }
  else if (req.method === 'DELETE') {
    const {
        query: { id, apt }
      } = req
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        id: id,
        apt: apt
      }
    };
    const response = await ddbDocClient.send(new DeleteCommand(params));
    return res.status(204).json(response);
    
  }
  else {
    res.setHeader('Allow', ['POST', 'DELETE'])
    res.status(405).end(`Method Not Allowed`)
  }
}