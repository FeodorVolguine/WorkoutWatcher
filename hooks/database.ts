import React from 'react';

import { Query, DocumentData, DocumentReference, onSnapshot } from 'firebase/firestore';

export function useDocument(document: DocumentReference<DocumentData>)
{
  const [data, SetData] = React.useState<any>();

  React.useEffect(() => {
    return onSnapshot(document, (doc) => SetData(doc.data()));
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