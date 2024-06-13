import { Pressable, View, Text } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View>
      <Link href="/entry" asChild>
        <Pressable>
          <Text>Entries</Text>
        </Pressable>
      </Link>
      <Link href="/bryle">View user</Link>
    </View>
  );
}
