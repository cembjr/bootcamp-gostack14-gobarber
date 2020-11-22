import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';

export const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', padding: 50 }}>
        <Button onPress={() => signOut()}>Deslogar</Button>
      </View>
    </>
  );
};
