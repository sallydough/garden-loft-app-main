// import React, { useState, useRef } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
// import Carousel from 'react-native-snap-carousel';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// const Activities2: React.FC = () => {
//   const [contacts, setContacts] = useState([
//     { id: 1, name: 'ROM Seated Exercise', phoneNumber: '1234567890',prompt:'Join Now?' },
//     { id: 2, name: 'Zumba', phoneNumber: '0987654321',prompt:'' },
//     { id: 3, name: 'Pictionary', phoneNumber: '9876543210', prompt:'' },
//     { id: 4, name: 'Scattegories', phoneNumber: '0123456789', prompt:'' },
//     { id: 5, name: 'Art History', phoneNumber: '6789012345', prompt:'' },
//   ]);

//   const scrollViewRef = useRef<ScrollView>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const handleCall = (phoneNumber: string) => {
//     const url = `tel:${phoneNumber}`;
//     Linking.openURL(url);
//   };

//   const handleSnapToItem = (index: number) => {
//     setActiveIndex(index);
//   };

//   const renderItem = ({ item, index }: { item: any; index: number }) => (
//     <TouchableOpacity
//       key={item.id}
//       style={[styles.cardContainer,{
//         backgroundColor: index === activeIndex + 3 ? "#f3b718" : "#f09030",
//       },]}
//       onPress={() => handleCall(item.phoneNumber)}>
//       {/* <MaterialCommunityIcons name="emoticon" size={94} color="white" /> */}
//       <Text style={styles.cardText}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Carousel
//         layout={'default'}
//         data={contacts}
//         renderItem={renderItem}
//         sliderWidth={Math.round(viewportWidth * 0.90)}
//         itemWidth={Math.round(viewportWidth * 0.3)}
//         loop={true}
//         useScrollView={true}
//         activeSlideAlignment="center"
//         ref={scrollViewRef}
//         inactiveSlideScale={0.8}
//         inactiveSlideOpacity={1}
//         onSnapToItem={(index) => handleSnapToItem(index)} // Handle snapping logic
//       />

// <Text style={styles.prompt}>{contacts[activeIndex].prompt && contacts[activeIndex].prompt}</Text>


//       <TouchableOpacity style={styles.arrowLeft} onPress={() => scrollViewRef.current?.snapToPrev()}>
//         <FontAwesome name="angle-left" size={124} color="rgb(45, 62, 95)" />
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.arrowRight} onPress={() => scrollViewRef.current?.snapToNext()}>
//         <FontAwesome name="angle-right" size={124} color="rgb(45, 62, 95)" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     height: 290,
//     alignItems: 'center',
//   },
//   cardContainer: {
//     width: viewportWidth * 0.3, // Adjusted to show 3 cards at a time
//     height: viewportHeight * 0.3,
//     backgroundColor: '#f09030',
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//     flexDirection: 'column',
//     gap: 25,
//   },
//   cardText: {
//     fontSize: 36,
//     color: '#393939',
//     fontWeight: '700',
//     textAlign: 'center'
//   },
//   prompt: {
//     fontSize: 30,
//     marginBottom: 15,
//   },
//   arrowLeft: {
//     position: 'absolute',
//     top: '40%',
//     left: -17,
//     transform: [{ translateY: -50 }],
//   },
//   arrowRight: {
//     position: 'absolute',
//     top: '40%',
//     right: -25,
//     transform: [{ translateY: -50 }],
//   },
// });

// export default Activities2;

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
  Linking,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import Carousel, { CarouselStatic }  from "react-native-snap-carousel";
import moment from "moment-timezone";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from 'expo-av';

import * as Notifications from 'expo-notifications';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

interface EventItem {
  item: string;
  startDate: Date;
  endDate?: Date;
  
}

const Activities2: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchEvents();

    // This listener handles notifications when the app is in the foreground
    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      Alert.alert("Notification Received", notification.request.content.body);
    });
  
    // This listener handles when a notification is tapped
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      Alert.alert("Notification Clicked", response.notification.request.content.body);
      // Navigate to a specific screen if necessary
    });
  
    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
  }, []);
  

  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  //   fetchEvents();
  
  //   // Listener for foreground notification handling
  //   const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
  //     Alert.alert("Notification Received", notification.request.content.body);
  //   });
  
  //   // Listener for when the user interacts with the notification (e.g., taps on it)
  //   const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
  //     Alert.alert("Notification Clicked", response.notification.request.content.body);
  //   });
  
  //   return () => {
  //     // Cleanup subscriptions when the component is unmounted
  //     foregroundSubscription.remove();
  //     responseSubscription.remove();
  //   };
  // }, []);
  
  async function fetchEvents() {
    try {
      const response = await axios.get(
        "https://api.signupgenius.com/v2/k/signups/report/filled/47293846/?user_key=UmNrVWhyYWwrVGhtQmdXeVpweTBZZz09"
      );
      if (!response.data.success) {
        throw new Error("Failed to retrieve signed-up activities.");
      }
      const currentTime = new Date();
      const eventData = response.data.data.signup.map((item: any) => ({
        item: item.item,
        startDate: moment
          .tz(item.startdatestring.replace(/-/g, "T"), "YYYY/MM/DD HH:mm", "")
          .toDate(),
        endDate: item.enddatestring
          ? moment
              .tz(
                item.enddatestring.replace(/-/g, "T"),
                "YYYY/MM/DD HH:mm:ss",
                ""
              )
              .toDate()
          : undefined,
        // Fetches Zoom link from Sign Up Genius
        zoomLink:
          item.location === "Zoom Meeting"
            ? "https://us06web.zoom.us/j/87666824017?pwd=RUZLSFVabjhtWjJVSm1CcDZsZXcrUT09"
            : null,
      }))
      .filter((event: EventItem) => event.startDate > currentTime); //Filter out past events
      // Sort events array by startDate in chronological order
      eventData.sort((a, b) => a.startDate - b.startDate);

      eventData.forEach(event => {
        scheduleNotification(event);
      });

      setEvents(eventData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching signed-up activities:", error.message);
      setError(
        "Failed to retrieve signed-up activities. Please try again later."
      );
      setLoading(false);
    }
  };


  async function registerForPushNotificationsAsync() {
    const settings = await Notifications.getPermissionsAsync();
    if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
        console.log('Notification permissions granted.');
    } else {
        const response = await Notifications.requestPermissionsAsync({
            ios: {
                allowAlert: true,
                allowSound: true,
                allowBadge: true,
                allowDisplayInCarPlay: true,
                allowCriticalAlerts: true,
            },
        });
        if (!response.granted) {
            alert('Failed to get push token for push notification!');
            return;
        }
    }

    // if (Platform.OS === 'android') {
    //     Notifications.setNotificationChannelAsync('default', {
    //         name: 'default',
    //         importance: Notifications.AndroidImportance.MAX,
    //         vibrationPattern: [0, 250, 250, 250],
    //         sound: true,
    //     });
    // }
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default', // This uses the system's default notification sound
      });
    }
    
}


   


  const scrollViewRef = useRef<CarouselStatic<EventItem> | null>(null);

  const scrollToNext = () => {
    if (scrollViewRef.current) {
      const currentIndex = scrollViewRef.current.currentIndex || 0;
      const nextIndex = currentIndex + 1;
      scrollViewRef.current.snapToItem(nextIndex, true, true);
    }
  };

  const scrollToPrevious = () => {
    if (scrollViewRef.current) {
      const currentIndex = scrollViewRef.current.currentIndex || 0;
      const prevIndex = currentIndex - 1;
      scrollViewRef.current.snapToItem(prevIndex, true, true);
    }
  };

  const navigateToZoomLink = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Renders modal to Activities start times
  const renderModalContent = (event: EventItem) => {
    const currentTime = new Date();
    const tenMinutesBeforeStartTime = new Date(event.startDate);
    tenMinutesBeforeStartTime.setMinutes(
      tenMinutesBeforeStartTime.getMinutes() - 10
    );

    if (event.endDate && currentTime > event.endDate) {
      return <Text>Event ended.</Text>;
    } else if (currentTime < tenMinutesBeforeStartTime) {
      return <Text>Event has not started yet.</Text>;
    } else if (
      currentTime >= tenMinutesBeforeStartTime &&
      currentTime < event.endDate
    ) {
      return (
        <Button
          title="Join Now"
          onPress={() => {
            Linking.openURL(selectedEvent.zoomLink);
          }}
        />
      );
    } else if (event.startDate <= currentTime && currentTime < event.endDate) {
      return <Button title="Event in progress" disabled />;
    } else {
      return null; // Event has ended
    }
  };

  // Renders carousel card items
  const renderItem = ({ item, index }: { item: EventItem; index: number }) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.cardContainer,
        { backgroundColor: index === activeIndex + 3 ? "#f3b718" : "#f09030" },
      ]}
      onPress={() => navigateToZoomLink(item)}
    >
      <Text style={styles.cardText}>{item.item}</Text>
      <Text style={styles.cardTextTime}>
        {moment(item.startDate).format("dddd MMMM Do, h:mm a")}
      </Text>
    </TouchableOpacity>
  );
  // Handles carousel navigation snap style
  const handleSnapToItem = (index: number) => {
    setActiveIndex(index);
  };

  
  const scheduleNotification = async (event) => {
    // Scheduling 10 minutes before the event
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Activity!",
        body: `Your activity ${event.item} is starting in 10 minutes.`,
        sound: true, // This uses the default sound
        data: { event },
      },
      trigger: {
        date: new Date(event.startDate.getTime() - 10 * 60 * 1000), // 10 minutes before the event
      },
    });
  
    // Scheduling 1 minute before the event
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Activity!",
        body: `Your activity ${event.item} is starting now.`,
        sound: true, // This uses the default sound
        data: { event },
      },
      trigger: {
        date: new Date(event.startDate.getTime() - 60 * 1000), // 1 minute before the event
      },
    });
  };
  


//   const scheduleNotification = async (event) => {
//     const schedulingOptions = {
//         content: {
//             title: "Upcoming Event!",
//             body: `Your event ${event.item} is starting soon.`,
//             sound: true, // Use the default sound
//             data: { event },
//         },
//         trigger: {
//             date: new Date(event.startDate.getTime() - 10 * 60 * 1000),
//         },
//     };
//     console.log("Scheduling notification:", schedulingOptions);
//     await Notifications.scheduleNotificationAsync(schedulingOptions);
// };



  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : error ? (
        <Text style={styles.loading}>Error: {error}</Text>
      ) : (
        <>
          <Carousel
            data={events}
            layout={"default"}
            renderItem={renderItem}
            sliderWidth={Math.round(viewportWidth * 0.9)}
            itemWidth={Math.round(viewportWidth * 0.3)}
            loop={true}
            useScrollView={true}
            activeSlideAlignment="center"
            ref={scrollViewRef}
            inactiveSlideScale={0.8}
            inactiveSlideOpacity={1}
            onSnapToItem={(index) => handleSnapToItem(index)} // Handle snapping logic
          />
          {/* Prompt Below */}
          {/* <Text style={styles.prompt}>
            {events[activeIndex].prompt && events[activeIndex].prompt}
          </Text> */}

          <TouchableOpacity style={styles.arrowLeft} onPress={scrollToPrevious}>
            <FontAwesome name="angle-left" size={124} color="rgb(45, 62, 95)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowRight} onPress={scrollToNext}>
            <FontAwesome
              name="angle-right"
              size={124}
              color="rgb(45, 62, 95)"
            />
          </TouchableOpacity>

          {isModalOpen && selectedEvent && (
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text>{selectedEvent.item}</Text>
                {selectedEvent.endDate && (
                  <Text>
                    End Date:{" "}
                    {moment(selectedEvent.endDate).format(
                      "dddd MMMM Do, h:mm a"
                    )}
                  </Text>
                )}
                {renderModalContent(selectedEvent)}
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 290,
    alignItems: "center",
  },
  cardContainer: {
    width: viewportWidth * 0.3, // Adjusted to show 3 cards at a time
    height: viewportHeight * 0.3, // Adjusted to fit the content
    backgroundColor: "#f09030",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    flexDirection: "column",
    gap: 10,
  },
  cardText: {
    fontSize: 30, // Adjusted font size
    color: "#393939",
    fontWeight: "700",
    textAlign: "center",
  },
  cardTextTime: {
    fontSize: 20, // Adjusted font size
    color: "#393939",
    fontWeight: "600",
    textAlign: "center",
  },
  loading: {
    flex: 1,
    alignItems: "flex-start",
    // marginTop: 30,
    // color: "#746E6E",
    fontSize: 44,
  },
  prompt: {
    fontSize: 30,
    color: '#393939',
    fontWeight: '700',
    marginTop: 15,
  },
  arrowLeft: {
    position: "absolute",
    top: "40%",
    left: -17,
    transform: [{ translateY: -50 }],
  },
  arrowRight: {
    position: "absolute",
    top: "40%",
    right: -25,
    transform: [{ translateY: -50 }],
  },
  modalContainer: {
    position: "absolute",
    top: "30%",
    // left: "74%",
    transform: [
      { translateX: -viewportWidth * 0.01 }, //for ios is 0.4
      { translateY: -viewportWidth * 0.2 },
    ],
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
  },
  modal: {
    backgroundColor: "beige",
    padding: 60,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default Activities2;