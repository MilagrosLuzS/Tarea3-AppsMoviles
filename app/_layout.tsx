import { Tabs } from "expo-router";


export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Cards" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="counter" options={{ title: "Counter" }} />
      <Tabs.Screen name="gallery" options={{ title: "Gallery" }} />
    </Tabs>
  );
}
