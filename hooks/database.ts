import React from 'react';

import { doc, Query, DocumentData, getDocs, onSnapshot } from 'firebase/firestore';

import { database } from '../config/Firebase';

export function useDocument(path: string)
{
  const [data, SetData] = React.useState<any>();

  React.useEffect(() => {
    return onSnapshot(doc(database, path), (doc) => SetData(doc.data()));
  }, []);

  return data;
}

export function useCollection(query: Query<DocumentData>)
{
  const [data, SetData] = React.useState<any[]>();

  React.useEffect(() => {
    return onSnapshot(query, (querySnapshot) => {
      const values: any[] = [];
      querySnapshot.forEach(doc => { values.push({ ...doc.data(), id: doc.id }); });
      SetData(values);
    });
  }, []);

  return data;
}