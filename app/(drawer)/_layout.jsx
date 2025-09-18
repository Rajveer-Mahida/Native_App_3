import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View, Text } from "react-native"; // ✅ added Text

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/42/8e/f9/428ef940df32343489d4a7d15300287b.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Hi, Rajveer 👋</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer
      // {/* Custom Drawer Content */}
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "#112D4E",
        drawerActiveTintColor: "#FFFFFF",
        drawerInactiveTintColor: "#34699A",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          headerShown: false,
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={20}
              color={focused ? "#FFFFFF" : "#000000"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="pexels"
        options={{
          title: "Pexels",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="images"
              size={20}
              color={focused ? "#FFFFFF" : "#000000"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="support"
        options={{
          title: "Support",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="help-circle"
              size={24}
              color={focused ? "#FFFFFF" : "#000000"}
            />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#112D4E",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
  },
});
