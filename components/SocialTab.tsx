import React from 'react';

import { VStack } from 'native-base';

import { FollowingList } from './FollowingList';
import { FollowRequests } from './FollowRequests';

export const SocialTab = () => {
  return (
    <VStack alignItems='center'>
      <FollowingList/>
      <FollowRequests/>
    </VStack>
  );
};