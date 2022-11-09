import { Text, Divider, Heading, Box, HStack, VStack } from 'native-base';

import { doc } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

import { useDocument } from '../hooks/database';

export const AnalyticsSummary = () => {
  const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';
  const userData = useDocument(doc(database, 'users', userID));

  return (
    <Box alignSelf='center' mt={6} p={4}>
      <Heading size='lg'>Summary</Heading>
      <VStack mt={4} space={4}>
        { userData?.oneRepMax ?
            Object.keys(userData?.oneRepMax).map((exercise: string) =>
              <VStack space={2} key={exercise}>
                <Text bold>{exercise}</Text>
                <Text>Estimated 1RM: {userData?.oneRepMax[exercise].toFixed(1)}lb</Text>
                <Divider w="100%"/>
              </VStack>
            )
          :
            null
        }
      </VStack>
    </Box>
  );
};