import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, useSegments } from 'expo-router';
import HomeIcon from '../../assets/icons/homeIcon.svg';
import CategoriesIcon from '../../assets/icons/categoriesIcon.svg';
import SearchIcon from '../../assets/icons/searchIcon.svg';
import CartIcon from '../../assets/icons/cartIcon.svg';
import PersonIcon from '../../assets/icons/personIcon.svg';


export default function TabLayout() {
  const segment = useSegments();
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarHideOnKeyboard: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <HomeIcon fill="black" opacity={focused ? 1 : 0.3} />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            tabBarIcon: ({ focused }) => (
              <CategoriesIcon fill="black" opacity={focused ? 1 : 0.3} />
            ), tabBarStyle: {
              display: segment[2] === "[categoryId]" ? "none" : "flex",
              ...styles.tabBar
            }
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused }) => (
              <SearchIcon fill="black" opacity={focused ? 1 : 0.3} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ focused }) => (
              <CartIcon fill="black" opacity={focused ? 1 : 0.3} />
            ), tabBarStyle: {
              display: segment[2] === "purchase" ? "none" : "flex",
              ...styles.tabBar
            }
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            tabBarIcon: ({ focused }) => (
              <PersonIcon fill="black" opacity={focused ? 1 : 0.3} />
            ), tabBarStyle: {
              display: ["likedProducts", "myProducts", "purchases", "sales"].includes(segment[2]?? "") ? "none" : "flex",
              ...styles.tabBar
            }
          }}
        />
      </Tabs>
      </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 3,
    borderColor: 'white',
    paddingHorizontal: 12,
  },
});
