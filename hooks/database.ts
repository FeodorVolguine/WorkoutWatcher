import React from 'react';

import { doc, Query, DocumentData, onSnapshot } from 'firebase/firestore';

import { database } from '../config/Firebase';

export function useDocument(path: string)
{
  const [data, SetData] = React.useState<any>();

  React.useEffect(() => onSnapshot(doc(database, path), (doc) => SetData(doc.data())), []);

  return data;
}

export function useCollection(query: Query<DocumentData>)
{
  const [data, SetData] = React.useState<any[]>();

  React.useEffect(() => onSnapshot(query, (querySnapshot) => {
    const values: any[] = [];
    querySnapshot.forEach((doc) => { values.push(doc.data()); });
    SetData(values);
  }), []);

  return data;
}