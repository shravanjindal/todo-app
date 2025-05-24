import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import client from '../lib/apolloClient';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </ApolloProvider>
  );
}
