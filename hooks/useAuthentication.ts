import React from 'react';

import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '../config/Firebase';

export function useAuthentication() {
  const [user, SetUser] = React.useState<User>();

  React.useEffect(() => onAuthStateChanged(auth, (user) => SetUser(user ? user : undefined)), []);

  return { user };
}