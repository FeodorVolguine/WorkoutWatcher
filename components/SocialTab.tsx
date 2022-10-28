import React from 'react';

import { VStack } from 'native-base';

import { FollowingList } from './FollowingList';
import { FollowRequests } from './FollowRequests';

export const SocialTab = () => {
  return (
    <VStack alignSelf='center' maxH='md'>
      <FollowingList/>
      <FollowRequests/>
    </VStack>
  );
};