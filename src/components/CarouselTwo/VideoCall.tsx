// import React, { useState, useRef } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Dimensions, Alert } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
// import Carousel from 'react-native-snap-carousel';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// const VideoCallCarousel: React.FC = () => {
//   const [contacts, setContacts] = useState([
//     { id: 1, name: 'Carina', phoneNumber: '1234567890',prompt: 'Call Carina?' },
//     { id: 2, name: 'Matt', phoneNumber: '0987654321',prompt: 'Call Matt?' },
//     { id: 3, name: 'Mesi', phoneNumber: '9876543210',prompt: 'Call Mesi?' },
//     { id: 4, name: 'Prapti', phoneNumber: '0123456789',prompt: 'Call Prapti' },
//     { id: 5, name: 'John', phoneNumber: '6789012345',prompt: 'Call John?' },
//   ]);

//   const scrollViewRef = useRef<Carousel<any>>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   // const handleCall = (phoneNumber: string) => {
//   //   const url = `tel:${phoneNumber}`;
//   //   Linking.openURL(url);
//   // };

//   const handleSnapToItem = (index: number) => {
//     setActiveIndex(index);
//   };

//   // const renderItem = ({ item, index }: { item: any; index: number }) => (
//   //   <TouchableOpacity
//   //     key={item.id}
//   //     style={[styles.cardContainer,{
//   //       backgroundColor: index === activeIndex + 3 ? "#f3b718" : "#f09030",
//   //     },]}
//   //     onPress={() => handleCall(item.phoneNumber)}>
//   //     <MaterialCommunityIcons name="emoticon" size={94} color="white" />
//   //     <Text style={styles.cardText}>{item.name}</Text>
//   //   </TouchableOpacity>
//   // );

//     // Simulate opening a video call
//     const handleVideoCall = (contactId: number) => {
//       // Here, you'd integrate with your backend to initiate a video call
//       // For now, we'll just display an alert
//       Alert.alert("Video Call", `Starting a video call with ${contacts.find(c => c.id === contactId)?.name}...`,
//         [
//           { text: "OK" }
//         ]);
//     };
  
//     const renderItem = ({ item, index }: { item: any; index: number }) => (
//       <TouchableOpacity
//         key={item.id}
//         style={[styles.cardContainer,{
//           backgroundColor: index === activeIndex ? "#f3b718" : "#f09030",
//         },]}
//         onPress={() => handleVideoCall(item.id)}>
//         <MaterialCommunityIcons name="video" size={94} color="white" />
//         <Text style={styles.cardText}>{item.name}</Text>
//       </TouchableOpacity>
//     );

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

//        {/* Prompt */}
//        <Text style={styles.prompt}>{contacts[activeIndex].prompt && contacts[activeIndex].prompt}</Text>

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
//   },
//   prompt: {
//     fontSize: 30,
//     marginBottom: 15,
//   },
//   arrowLeft: {
//     position: 'absolute',
//     paddingTop: 20,
//     paddingBottom: 20,
//     top: '30%',
//     left: -17,
//     transform: [{ translateY: -50 }],
//   },
//   arrowRight: {
//     position: 'absolute',
//     paddingTop: 20,
//     paddingBottom: 20,
//     top: '30%',
//     right: -25,
//     transform: [{ translateY: -50 }],
//   },
// });

// export default VideoCallCarousel;

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FIRESTORE_DB } from "../../../FirebaseConfig";
import { doc, getDoc } from 'firebase/firestore';
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoSK from './VideoSK';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');



const VideoCallCarousel = () => {
  const [contacts, setContacts] = useState([
    { id: 'goldenGirls', name: 'Carina', prompt: 'Watch Golden Girls?' },
    { id: 'jeopardy', name: 'Elizabeth', prompt: 'Watch Jeopardy?' },
    { id: 'Wheel Of Fortune', name: 'Pat', prompt: 'Watch Wheel Of Fortune?' },
    { id: 1, name: 'Shari', phoneNumber: '1234567890',prompt: 'Call Carina?'  },
    // Add more shows with their unique Firestore document IDs
  ]);

  const [youtubeId, setYoutubeId] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [meetingId, setMeetingId] = useState('');

  const fetchAndPlayVideo = async (docId: string) => {
    const docRef = doc(FIRESTORE_DB, "entertainment", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setYoutubeId(docSnap.data().youtubeId); // Assuming the document contains a field `youtubeId`
      setIsModalVisible(true); // Open the modal to play video
    } else {
      console.log("No such document!-videocallcarousel");
    }
  };

// // Initialize Meeting:
// // Please go into .env file and copy and paste TOKEN into this line below:
// const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1NjRhMzM3OS04YzA1LTRkM2ItODIxNi1kNzU1NDRlYTU0MTkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMjk1NDg0MSwiZXhwIjoxNzI4NTA2ODQxfQ.dLo_1mf5SWhP9ou11weP-FvZjm9cWicwuyqmopqp268';

// // Define a type for the function parameter
// type CreateMeetingParams = {
//   token: string;
// };

// // API call to create meeting
//  const createMeeting = async ({ token }: CreateMeetingParams): Promise<string> => {
//   const response = await fetch('https://api.videosdk.live/v1/meetings', {
//     method: 'POST',
//     headers: {
//       authorization: `${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ region: 'sg001' }),
//   });

//   const { meetingId } = await response.json();
//   return meetingId;
// };

// // TypeScript type for function
// const fetchAndInitializeVideoCall = (): void => {
//   const docId: string = 'example-doc-id'; // Example docId, replace with actual value
//   fetchAndPlayVideo(docId);
// };

// // TypeScript type for async function
// const handleTracyCardPress = async (): Promise<void> => {
//   const meetingId: string = await createMeeting({ token });
//   setMeetingId(meetingId); // Assuming setMeetingId sets the meeting context in React state

//   // Save the meeting ID to Firestore
//   const db = firebase.firestore();
//   const meetingRef = db.collection('meetings').doc(meetingId);
//   await meetingRef.set({
//     caller: 'Elizabeth',
//     callee: 'Tracy',
//     meetingId: meetingId,
//     status: 'initiated' // Status can be used to manage call states
//   });
// };


  const handleSnapToItem = (index: number) => {
        setActiveIndex(index);
      };

      const scrollViewRef = useRef<ScrollView>(null);

  const renderItem = ({ item, index}) => (
    <TouchableOpacity
      key={item.id}
     
      style={[styles.cardContainer,{
                backgroundColor: index === activeIndex + 3 ? "#f3b718" : "#f09030",
              },]}
      onPress={() => fetchAndPlayVideo(item.id)}
    >
      <MaterialCommunityIcons name="emoticon" size={94} color="white" />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Carousel
        layout={'default'}
        data={contacts}
        renderItem={renderItem}
        sliderWidth={viewportWidth * 0.9}
        itemWidth={viewportWidth * 0.3}
        onSnapToItem={(index) => setActiveIndex(index)}
      /> */}
      <Carousel
        layout={'default'}
        data={contacts}
        renderItem={renderItem}
        sliderWidth={Math.round(viewportWidth * 0.90)}
        itemWidth={Math.round(viewportWidth * 0.3)}
        loop={true}
        useScrollView={true}
        activeSlideAlignment="center"
        ref={scrollViewRef}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={1}
        onSnapToItem={(index) => handleSnapToItem(index)} // Handle snapping logic
      />
      <Text style={styles.prompt}>{contacts[activeIndex]?.prompt}</Text>

      <TouchableOpacity style={styles.arrowLeft} onPress={() => scrollViewRef.current?.snapToPrev()}>
        <FontAwesome name="angle-left" size={124} color="rgb(45, 62, 95)" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.arrowRight} onPress={() => scrollViewRef.current?.snapToNext()}>
        <FontAwesome name="angle-right" size={124} color="rgb(45, 62, 95)" />
      </TouchableOpacity>

      {/* Modal for YouTube Player */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalView}>
          {/* <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(!isModalVisible)}
          >
            <FontAwesome name="arrow-left" size={24} color="black" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(!isModalVisible)}
          >
            <FontAwesome name="arrow-left" size={24} color="black" />
            <Text style={styles.closeText}>Back To Garden Loft App</Text>
          </TouchableOpacity>
          {/* {youtubeId && (
            <YoutubePlayer
              height={viewportHeight * 0.8}
              width={viewportWidth * 0.8}
              videoId={youtubeId}
              play={true}
            />
          )} */}
          <VideoSK />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    height: 290,
  
  },
  cardContainer: {
    width: viewportWidth * 0.3,
    height: viewportHeight * 0.3,
    backgroundColor: '#f09030',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cardText: {
    fontSize: 36,
    color: '#393939',
    fontWeight: '700',
   
  },
  prompt: {
    fontSize: 30,
    color: '#393939',
    fontWeight: '700',
    marginTop: 15,
  },
  arrowLeft: {
        position: 'absolute',
        top: '40%',
        left: -17,
        transform: [{ translateY: -50 }],
      },
      arrowRight: {
        position: 'absolute',
        top: '40%',
        right: -25,
        transform: [{ translateY: -50 }],
      },
  modalView: {
    margin: 20,
    height: viewportHeight * 0.9,
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 3,
    paddingTop: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    left: 400,
    top: 30,
    backgroundColor: "lightblue",
    padding: 13,
    borderRadius: 5,
  },
  closeText: {
    fontSize: 24,
    position: 'absolute',
    left: 40,
    top: 0,
    width: 320, 
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 70,

  }
});

export default VideoCallCarousel;