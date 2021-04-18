import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentOptions } from '~/utils/router';

export default function SafeArea() {
  const [headerShown, setHeaderShown] = useState(true);

  useEffect(() => {
    (async () => {
      const { headerShown } = await getCurrentOptions();
      setHeaderShown(headerShown);
    })();
  }, []);

  const navigation = useNavigation();

  return (
    <SafeAreaView
      edges={headerShown ? ['bottom', 'left', 'right'] : ['top', 'bottom', 'left', 'right']}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'goldenrod' }}>
        <Text>This is top text.</Text>
        <Button
          title="Toggle Header"
          onPress={() => {
            navigation.setOptions({
              headerShown: !headerShown,
            });
            setHeaderShown(!headerShown);
          }}
        />
        <Text>This is bottom text.</Text>
      </View>
    </SafeAreaView>
  );
}

// const Tab = createBottomTabNavigator();

// export default function SafeArea() {
//   return (
//     <Tab.Navigator initialRouteName="Analytics">
//       <Tab.Screen name="Analytics" component={Demo} />
//       <Tab.Screen name="Profile" component={Demo} />
//     </Tab.Navigator>
//   );
// }
