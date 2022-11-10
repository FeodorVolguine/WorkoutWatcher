import React from 'react';

import { VStack } from 'native-base';

import { doc } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

import { useDocument } from '../hooks/database';

import { FollowingList } from './FollowingList';
import { FollowRequests } from './FollowRequests';

export const SocialTab = () => {
  const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';
  const userData = useDocument(doc(database, 'users', userID));

  return (
    <VStack alignItems='center'>
      <FollowingList userID={userID} userData={userData}/>
      <FollowRequests/>
    </VStack>
  );
};