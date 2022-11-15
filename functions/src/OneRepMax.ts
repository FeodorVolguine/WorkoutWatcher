import * as functions from "firebase-functions";

import { Query, QuerySnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase-admin/firestore';

import { Expo, ExpoPushMessage } from 'expo-server-sdk';

const admin = require('firebase-admin');
admin.initializeApp();

const database = admin.firestore();

// Create a new Expo SDK client
let expo = new Expo();

const SendPushNotifications = async (messages: ExpoPushMessage[]): Promise<void> =>
{
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for(let chunk of chunks)
    {
      try
      {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      }
      catch (error)
      {
        console.error(error);
      }
    }
  })();

  //TODO: Handle tickets...
}

export const OneRepMax = functions.firestore.document('users/{userID}').onWrite(async (change, context) => {
  console.log('OneRepMax cloud function has run!');
  //const new1RMs = change.after.data()?.oneRepMax;
  //const old1RMs = change.before.data()?.oneRepMax;

  //TODO: Find which 1RM was surpassed...
  //const new1RM = 'abc'

  const query: Query<DocumentData> = database.collection('users').where('following', 'array-contains', context.params.userID);
  //.where('oneRepMax.abc', '<', new1RMs['abc'])
  const followersSurpassed: QuerySnapshot<DocumentData> = await query.get();
  
  let messages: ExpoPushMessage[] = [];
  followersSurpassed.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    if('expoPushToken' in doc.data())
    {
      if(Expo.isExpoPushToken(doc.data().expoPushToken))
      {
        messages.push({
          to: doc.data().expoPushToken,
          sound: 'default',
          body: 'Someone beat your abc record'
          //data: { withSome: 'data' }
        });
      }
      else
      {
        console.error(`User ${doc.id} has an invalid Expo push token`);
      }
    }
  });

  if(messages.length)
    await SendPushNotifications(messages);
});