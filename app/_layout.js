import { Stack } from "expo-router/stack";
import SplashScreen from "../components/SplashScreen";
import React, { useEffect } from "react";

export default function Layout() {
  const [timePassed, setTimePassed] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimePassed(true);
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (!timePassed) {
    return <SplashScreen />;
  } else {
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  }

  //   return (
  //     <Stack>
  //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //     </Stack>
  //   );
}
