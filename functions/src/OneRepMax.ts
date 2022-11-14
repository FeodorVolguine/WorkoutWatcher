import * as functions from "firebase-functions";

import { Query, QuerySnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase-admin/firestore';

const admin = require('firebase-admin');
admin.initializeApp();

const database = admin.firestore();

export const OneRepMax = functions.firestore.document('users/{userID}').onWrite(async (change, context) => {
  console.log('OneRepMax cloud function has run!');
  //const new1RMs = change.after.data()?.oneRepMax;
  //const old1RMs = change.before.data()?.oneRepMax;

  //TODO: Find which 1RM was surpassed...
  //const new1RM = 'abc'

  const query: Query<DocumentData> = database.collection('users').where('following', 'array-contains', context.params.userID);
  //.where('oneRepMax.abc', '<', new1RMs['abc'])
  const followersSurpassed: QuerySnapshot<DocumentData> = await query.get();
  
  followersSurpassed.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    console.log('Surpassed user: ', doc.id);
  });
});