// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * @format
// //  */


import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList, Dimensions, Alert
} from 'react-native';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
} from '@videosdk.live/react-native-sdk';
import {createMeeting, token} from './ApiSK';
import { FIRESTORE_DB } from "../../../FirebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import io from 'socket.io-client';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// Assuming the server is running on your local machine and your mobile device can access it via local network IP
// const socket = io.connect("http://localhost:3000");


// // A Join Screen to our app with which you can create new meetings or join existing meetings.
function JoinScreen(props) {

  const [meetingId, setMeetingId] = useState('');

  const handleCreateMeeting = async () => {
    // const newMeetingId = await createMeeting({ token });
    const newMeetingId = "2eir-4xus-3ygn"
    console.log("newMeetingId", newMeetingId);
    setMeetingId(newMeetingId);  // Update the meeting ID in state

    // Firestore document references
    const elizabethContactRef = doc(FIRESTORE_DB, 'contacts', 'Elizabeth');
    const tracyContactRef = doc(FIRESTORE_DB, 'contacts', 'Elizabeth', 'contacts', 'Shane');

    // Update Firestore documents
    await setDoc(elizabethContactRef, { meetingId: newMeetingId }, { merge: true });
    await setDoc(tracyContactRef, { calleeId: newMeetingId, status: 'initiated' }, { merge: true });

    // const newMeetingId = await createMeeting({ token });
    // setMeetingId(newMeetingId);

    // const contactRef = doc(FIRESTORE_DB, 'contacts', 'Carina');
    // await setDoc(contactRef, { calleeId: newMeetingId, status: 'initiated' }, { merge: true });

    // // Emit the callUser event
    // socket.emit('callUser', {
    //   userToCall: 'Carina', // This should be dynamically set based on actual user details
    //   signalData: 'someSignalData', // You need to define how signal data is structured
    //   from: newMeetingId,
    //   name: 'Your Name' // Name of the caller
    // });

    props.getMeetingId(newMeetingId);  // Propagate the meeting ID up to the parent component to switch view
    props.onMeetingCreated(newMeetingId);  // Additional prop to signal meeting creation
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 10 * 10,
        width: viewportWidth * 0.88,
      }}>

<TouchableOpacity
        onPress={handleCreateMeeting}
        style={{ backgroundColor: '#f3b718', padding: 12, borderRadius: 6 }}>
        <Text onPress={() => initiateCall('messi@gmail.com')}style={{ color: 'black', alignSelf: 'center', fontSize: 38 }}>
          Call Carina?
        </Text>
      </TouchableOpacity>
      {/* Additional UI components */}


        {/* Original Video Meeting Display ...start */}
      {/* <TouchableOpacity
        // onPress={() => {
        //   props.getMeetingId();
        // }}
        onPress={() => {
          handleButtonPress();
        }}
        style={{backgroundColor: '#1178F8', padding: 12, borderRadius: 6}}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>
          Create Meeting
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: 'center',
          fontSize: 22,
          marginVertical: 16,
          fontStyle: 'italic',
          color: 'grey',
        }}>
        ---------- OR ----------
      </Text>
      <TextInput
        value={meetingVal}
        onChangeText={setMeetingVal}
        placeholder={'XXXX-XXXX-XXXX'}
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 6,
          fontStyle: 'italic',
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#1178F8',
          padding: 12,
          marginTop: 14,
          borderRadius: 6,
        }}
        onPress={() => {
          props.getMeetingId(meetingVal);
        }}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>
          Join Meeting
        </Text>
      </TouchableOpacity> */}
      {/* Original Video Meeting Display ..end */}

      {/* Call Tracy Button...start */}
      {/* <TouchableOpacity
  onPress={() => handleTracyCardPress()}
  style={{ backgroundColor: '#1178F8', padding: 12, borderRadius: 6 }}>
  <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>
    Call Tracy
  </Text>
</TouchableOpacity> */}
{/* Call Tracy Button...end */}
    </SafeAreaView>
  );
}

// function JoinScreen({setMeetingIdSDK}) {
//   // const [meetingValSDK, setMeetingIdSDK] = useState('')

//   const handleTracyCardPress = async () => {
//     const meetingId = await createMeeting({token});
//     setMeetingIdSDK = meetingId; // Update state in the parent component

//     // Firestore document reference
//     const elizabethContactRef = doc(FIRESTORE_DB, 'contacts', 'Elizabeth');
//     const tracyContactRef = doc(FIRESTORE_DB, 'contacts', 'Elizabeth', 'contacts', 'Jimmy');

//     // Set data in Firestore under Elizabeth's contact list
//     await setDoc(elizabethContactRef, {meetingId: meetingId}, {merge: true});

//     // Set data under Tracy's contact details and update status
//     await setDoc(tracyContactRef, {calleeId: meetingId, status: 'initiated'}, {merge: true});

//     // Trigger notification to Tracy (implementation depends on your notification setup)
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#F6F6FF', justifyContent: 'center'}}>
//       <TouchableOpacity onPress={handleTracyCardPress} style={{backgroundColor: '#1178F8', padding: 12, borderRadius: 6}}>
//         <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>Call Tracy</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const initiateCall = async (calleeEmail) => {
//   //change at server.js, index.js, and videosdk.ts
//   const socket = io('http://192.168.1.73:3000/');
//   const callDocRef = doc(FIRESTORE_DB, 'calls', 'callId');
//   await setDoc(callDocRef, {
//     callerId: 'pat@gmail.com',
//     calleeId: calleeEmail,
//     status: 'initiated',
//     timestamp: new Date()
//   });

//   socket.emit('callUser', {
//     calleeId: calleeEmail,
//     from: 'pat@gmail.com',
//     name: 'Pat',
//     callId: callDocRef.id
//   });
// };

const initiateCall = async (calleeEmail) => {
  const callDocRef = await doc(FIRESTORE_DB,'calls', 'callId');
  await setDoc(callDocRef, {
    callerId: 'pat@gmail.com',
    calleeId: calleeEmail,
    status: 'initiated',
    timestamp: new Date()
  });
  
  // const socket = io('http://192.168.1.73:3000/'); // thin air labs wifi
  const socket = io('http://10.0.0.193:3000/'); // sally wifi
  // const socket = io('http://10.44.22.86:3000/'); //inception wifi
  socket.emit('callUser', {
    calleeId: calleeEmail,
    from: 'pat@gmail.com',
    name: 'Pat',
    callId: callDocRef.id
  });
};



const Button = ({onPress, buttonText, backgroundColor}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 4,
      }}>
      <Text style={{color: 'white', fontSize: 12}}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

//Manages features like Joining or leaving Meeting and Enable or Disable Webcam/Mic.
function ControlsContainer({join, leave, toggleWebcam, toggleMic}) {
  return (
    <View
      style={{
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: viewportWidth * 0.88,
      }}>
      <Button
        onPress={() => {
          join();
        }}
        buttonText={'Join'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          toggleWebcam();
        }}
        buttonText={'Toggle Webcam'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          toggleMic();
        }}
        buttonText={'Toggle Mic'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          leave();
        }}
        buttonText={'Leave'}
        backgroundColor={'#FF0000'}
      />
    </View>
  );
}

// After implementing controls, it's time to render joined participants.
// We will get joined participants from useMeeting Hook.

// function ParticipantView({participantId}) {
//   //useParticipant hook is responsible for handling all the properties and events of one particular participant who joined in the meeting. It will take participantId as an argument.
//   //Example for useParticipant Hook
//   const {webcamStream, webcamOn} = useParticipant(participantId);
//   return webcamOn ? (
//     <RTCView
//       streamURL={new MediaStream([webcamStream.track]).toURL()}
//       objectFit={'cover'}
//       style={{
//         height: 300,
//         marginVertical: 8,
//         marginHorizontal: 8,
//       }}
//     />
//   ) : (
//     <View
//       style={{
//         backgroundColor: 'grey',
//         height: 300,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text style={{fontSize: 16}}>NO MEDIA</Text>
//     </View>
//   );
// }

//////////////////////////
function ParticipantView({participantId}) {
  // useParticipant hook is responsible for handling all the properties and events of one particular participant who joined in the meeting. It will take participantId as an argument.
  // Example for useParticipant Hook
  const {webcamStream, webcamOn} = useParticipant(participantId);

  // Check if webcam is on and webcamStream is not null
  if (webcamOn && webcamStream) {
    return (
      <RTCView
        streamURL={new MediaStream([webcamStream.track]).toURL()}
        objectFit={'cover'}
        style={{
          flex: 1,
          // flexDirection: "row",
          height: 250,
          // width: viewportWidth * 0.4,
          // height: viewportHeight * 0.3,
          marginVertical: 8,
          marginHorizontal: 8,
        }}
   
      />
    );
  } else {
    // Return a placeholder or an alternative view if webcam is not on or webcamStream is null
    return (
      <View
        style={{
          height: 550,
          marginVertical: 8,
          marginHorizontal: 8,
          backgroundColor: '#cccccc', // Placeholder color
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Webcam is off</Text>
      </View>
    );
  }
}

function ParticipantList({participants}) {
  return participants.length > 0 ? (
    <FlatList
      data={participants}
      renderItem={({item}) => {
        return <ParticipantView participantId={item} />;
      }}
    />
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20}}>Press Join button to enter meeting.</Text>
    </View>
  );
}

// Original meeting view ...start
function MeetingView({autoJoin, setAutoJoin}) {
  const {join, leave, toggleWebcam, toggleMic, meetingId, participants} =
    useMeeting({});
  const participantsArrId = [...participants.keys()];

  useEffect(() => {
    if (autoJoin) {
      join();
      toggleWebcam();  // Automatically turn on the webcam
      setAutoJoin(false);  // Reset the auto-join state
    }
  }, [autoJoin, join, toggleWebcam, setAutoJoin]);

  return (
    <View style={{flex: 1}}>
      {meetingId ? (
        <Text style={{fontSize: 18, padding: 12}}>Meeting Id :{meetingId}</Text>
      ) : null}
      <ParticipantList participants={participantsArrId}/>
      <ControlsContainer
        join={join}
        leave={leave}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
      />
    </View>
  );
}


export default function VideoSK() {
  const [meetingId, setMeetingId] = useState(null);
  const [autoJoin, setAutoJoin] = useState(false);

  // const getMeetingId = async id => {
  //   const meetingId = id == null ? await createMeeting({token}) : id;
  //   setMeetingId(meetingId);
  // };




  const getMeetingId = id => {
    setMeetingId(id);
    setAutoJoin(true);  // Set flag to auto-join and activate webcam
  };



  return meetingId ? (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: true,
          name: 'Test User',
        }}
        token={token}>
        <MeetingView autoJoin={autoJoin} setAutoJoin={setAutoJoin} />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <JoinScreen getMeetingId={getMeetingId} />
  );
}






