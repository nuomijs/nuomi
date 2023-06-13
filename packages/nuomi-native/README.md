# 介绍

[![NPM version](https://img.shields.io/npm/v/nuomi-native)](https://npmjs.org/package/nuomi-native)
[![NPM downloads](https://img.shields.io/npm/dm/nuomi-native)](https://npmjs.org/package/nuomi-native)

基于nuomi和react-navigation开发的react-native数据流解决方案。

## 安装

```
yarn add nuomi-native
```

## 使用

```js
import { Text } from 'react-native';
import { NuomiNative, useConnect } from 'nuomi-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeLayout() {
  const [{ count }, dispatch] = useConnect();

  const onPress = () => {
    dispatch('@update', {
      count: count + 1,
    });
  };

  return <Text onPress={onPress}>{count}</Text>;
}

function Home() {
  return (
    <NuomiNative state={{ count: 0 }}>
      <HomeLayout />
    </NuomiNative>
  )
}

function Profile() {
  return <Text>Profile</Text>
}

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

```
