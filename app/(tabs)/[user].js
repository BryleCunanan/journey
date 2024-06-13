import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Page() {
    const {user} = useLocalSearchParams();

  return (
    <View>
      <Text>Page: {user}</Text>
    </View>
  )
}
