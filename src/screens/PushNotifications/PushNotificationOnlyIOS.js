/**
 * push notification ios
 */

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, View, DeviceEventEmitter } from 'react-native';

const Button = ({ onPress, label }) => (
  <TouchableHighlight underlayColor="white" style={styles.button} onPress={onPress}>
    <Text style={styles.buttonLabel}>{label}</Text>
  </TouchableHighlight>
);

const PushNotificationOnlyIOS = () => {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    PushNotificationIOS.addEventListener('register', onRegistered);
    PushNotificationIOS.addEventListener('registrationError', onRegistrationError);
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    PushNotificationIOS.addEventListener('localNotification', onLocalNotification);

    PushNotificationIOS.requestPermissions().then(
      (data) => {
        console.log('PushNotificationIOS.requestPermissions', data);
      },
      (data) => {
        console.log('PushNotificationIOS.requestPermissions failed', data);
      },
    );

    return () => {
      PushNotificationIOS.removeEventListener('register');
      PushNotificationIOS.removeEventListener('registrationError');
      PushNotificationIOS.removeEventListener('notification');
      PushNotificationIOS.removeEventListener('localNotification');
    };
  }, []);

  const sendNotification = () => {
    DeviceEventEmitter.emit('remoteNotificationReceived', {
      remote: true,
      aps: {
        alert: { title: 'title', subtitle: 'subtitle', body: 'body' },
        badge: 1,
        sound: 'default',
        category: 'REACT_NATIVE',
        'content-available': 1,
        'mutable-content': 1,
      },
    });
  };

  const sendSilentNotification = () => {
    DeviceEventEmitter.emit('remoteNotificationReceived', {
      remote: true,
      aps: {
        category: 'REACT_NATIVE',
        'content-available': 1,
      },
    });
  };

  const sendLocalNotification = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'sampleNotification',
      title: 'Sample Title',
      sbutitle: 'Sample Subtitle',
      body: 'Sample local notification',
      badge: 1,
    });
  };

  const sendLocalNotificationWithSound = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'notificationWithSound',
      title: 'Sample Title',
      subtitle: 'Sample Subtitle',
      body: 'Sample local notification with custom sound',
      sound: 'customSound.wav',
      badge: 1,
    });
  };

  const scheduleLocalNotification = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'sampleNotification',
      title: 'Schedule Local Notification',
      body: 'Test Local Notification',
      fireDate: new Date(new Date().valueOf() + 2000).toISOString(),
    });
  };

  const addNotificationRequest = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'test',
      title: 'title',
      subtitle: 'subtitle',
      body: 'body',
      category: 'test',
      threadId: 'thread-id',
      fireDate: new Date(new Date().valueOf() + 2000),
      repeats: true,
    });
  };

  const addMultipleRequests = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'test-1',
      title: 'First',
      subtitle: 'subtitle',
      body: 'First Notification out of 3',
      category: 'test',
      threadId: 'thread-id',
      fireDate: new Date(new Date().valueOf() + 10000),
      repeats: true,
    });

    PushNotificationIOS.addNotificationRequest({
      id: 'test-2',
      title: 'Second',
      subtitle: 'subtitle',
      body: 'Second Notification out of 3',
      category: 'test',
      threadId: 'thread-id',
      fireDate: new Date(new Date().valueOf() + 12000),
      repeats: true,
    });

    PushNotificationIOS.addNotificationRequest({
      id: 'test-3',
      title: 'Third',
      subtitle: 'subtitle',
      body: 'Third Notification out of 3',
      category: 'test',
      threadId: 'thread-id',
      fireDate: new Date(new Date().valueOf() + 14000),
      repeats: true,
    });
  };

  const getPendingNotificationRequests = () => {
    PushNotificationIOS.getPendingNotificationRequests((requests) => {
      Alert.alert('Push Notification Received', JSON.stringify(requests), [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ]);
    });
  };

  const setNotificationCategories = () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'test',
        actions: [
          { id: 'open', title: 'Open', options: { foreground: true } },
          {
            id: 'ignore',
            title: 'Desruptive',
            options: { foreground: true, destructive: true },
          },
          {
            id: 'text',
            title: 'Text Input',
            options: { foreground: true },
            textInput: { buttonTitle: 'Send' },
          },
        ],
      },
    ]);
    Alert.alert('setNotificationCategories', 'Set notification category complete', [
      {
        text: 'Dismiss',
        onPress: null,
      },
    ]);
  };

  const removeAllPendingNotificationRequests = () => {
    PushNotificationIOS.removeAllPendingNotificationRequests();
  };

  const removePendingNotificationRequests = () => {
    PushNotificationIOS.removePendingNotificationRequests(['test-1', 'test-2']);
  };

  const onRegistered = (deviceToken) => {
    Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
      {
        text: 'Dismiss',
        onPress: null,
      },
    ]);
  };

  const onRegistrationError = (error) => {
    console.log('Failed To Register For Remote Push', error);
    // Alert.alert('Failed To Register For Remote Push', `Error (${error.code}): ${error.message}`, [
    //   {
    //     text: 'Dismiss',
    //     onPress: null,
    //   },
    // ])
  };

  const onRemoteNotification = (notification) => {
    console.log('----- onRemoteNotification -------', notification);
    const isClicked = notification.getData().userInteraction === 1;

    const result = `
       Title:  ${notification.getTitle()};\n
       Subtitle:  ${notification.getSubtitle()};\n
       Message: ${notification.getMessage()};\n
       badge: ${notification.getBadgeCount()};\n
       sound: ${notification.getSound()};\n
       category: ${notification.getCategory()};\n
       content-available: ${notification.getContentAvailable()};\n
       Notification is clicked: ${String(isClicked)}.`;

    if (notification.getTitle() === undefined) {
      //   Alert.alert('Silent push notification Received', result, [
      //     {
      //       text: 'Send local push',
      //       onPress: sendLocalNotification,
      //     },
      //   ])
    } else {
      Alert.alert('Push Notification Received', result, [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ]);
    }
  };

  const onLocalNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;
    console.log('----- onLocalNotifications -------', notification);

    Alert.alert(
      'Local Notification Received',
      `Alert title:  ${notification.getTitle()},
       Alert subtitle:  ${notification.getSubtitle()},
       Alert message:  ${notification.getMessage()},
       Badge: ${notification.getBadgeCount()},
       Sound: ${notification.getSound()},
       Thread Id:  ${notification.getThreadID()},
       Action Id:  ${notification.getActionIdentifier()},
       User Text:  ${notification.getUserText()},
       Notification is clicked: ${String(isClicked)}.`,
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
  };

  const showPermissions = () => {
    PushNotificationIOS.checkPermissions((permissions) => {
      setPermissions({ permissions });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold' }}>Remote notifications (only real device)</Text>
      <Button onPress={sendNotification} label="Send remote notification" />
      <Button onPress={sendSilentNotification} label="Send silent remote notification" />
      <View style={{ width: '100%', height: 12, backgroundColor: '#eee' }} />
      <Text style={{ fontWeight: 'bold' }}>Local notifications</Text>
      <Button onPress={sendLocalNotification} label="Send fake local notification" />
      <Button onPress={sendLocalNotificationWithSound} label="Send fake local notification with custom sound" />
      <Button onPress={scheduleLocalNotification} label="Schedule fake local notification" />
      <Button onPress={addNotificationRequest} label="Add Notification Request" />
      <Button onPress={addMultipleRequests} label="Add Multiple Notification Requests" />
      <View style={{ width: '100%', height: 12, backgroundColor: '#eee' }} />
      <Button onPress={setNotificationCategories} label="Set notification categories" />
      <Button onPress={removePendingNotificationRequests} label="Remove Partial Pending Notification Requests" />
      <Button onPress={removeAllPendingNotificationRequests} label="Remove All Pending Notification Requests" />

      <Button
        onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(42)}
        label="Set app's icon badge to 42"
      />
      <Button onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(0)} label="Clear app's icon badge" />
      <Button onPress={getPendingNotificationRequests} label="Get Pending Notification Requests" />
      <View>
        <Button onPress={showPermissions} label="Show enabled permissions" />
        <Text>{JSON.stringify(permissions)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
});

export default PushNotificationOnlyIOS;
