// import React, { useEffect, useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";
// import io from "socket.io-client";

// const signalingServerUrl = "http://192.168.1.73:3000";

// export default function TestVideo() {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);

//   useEffect(() => {
//     const startLocalStream = async () => {
//       const stream = await mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setLocalStream(stream);
//     };
//     startLocalStream();
//   }, []);
//   useEffect(() => {
//     const socket = io.connect(signalingServerUrl);
//     setSocket(socket);
//     return () => {
//       socket.disconnect();
//       setSocket(null);
//     };
//   }, []);
//   useEffect(() => {
//     if (socket) {
//       socket.on("offer", async (offer) => {
//         const pc = new RTCPeerConnection();
//         setPeerConnection(pc);
//         // Add local stream to peer connection
//         localStream.getTracks().forEach((track) => {
//           pc.addTrack(track, localStream);
//         });
//         // Set remote description and create answer
//         await pc.setRemoteDescription(offer);
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         socket.emit("answer", answer);
//       });
//       socket.on("answer", async (answer) => {
//         await peerConnection.setRemoteDescription(answer);
//       });
//       socket.on("candidate", (candidate) => {
//         peerConnection.addIceCandidate(candidate);
//       });
//     }
//   }, [socket]);
//   return (
//     <View style={styles.container}>
//       {localStream && (
//         <RTCView
//           streamURL={localStream.toURL()}
//           style={styles.localVideo}
//         />
//       )}

//       {remoteStream && (
//         <RTCView
//           streamURL={remoteStream.toURL()}
//           style={styles.remoteVideo}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   localVideo: {
//     width: 200,
//     height: 150,
//   },
//   remoteVideo: {
//     flex: 1,
//   },
// });

// --------------------

// import React, { useEffect, useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";
// import io from "socket.io-client";

// const signalingServerUrl = "http://192.168.1.73:3000";

// export default function TestVideo() {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);

//   useEffect(() => {
//     const startLocalStream = async () => {
//       const stream = await mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setLocalStream(stream);
//     };
//     startLocalStream();
//   }, []);

//   useEffect(() => {
//     const socket = io.connect(signalingServerUrl);
//     setSocket(socket);
//     return () => {
//       socket.disconnect();
//       setSocket(null);
//     };
//   }, []);

//   useEffect(() => {
//     if (socket && localStream) {
//       // Define configuration for the RTCPeerConnection
//       const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
//       const pc = new RTCPeerConnection(configuration);

//       // Listen for tracks on the remote connection
//       pc.ontrack = (event) => {
//         if (event.streams && event.streams[0]) {
//           setRemoteStream(event.streams[0]);
//         }
//       };

//       setPeerConnection(pc);

//       localStream.getTracks().forEach(track => {
//         pc.addTrack(track, localStream);
//       });

//       socket.on("offer", async (offer) => {
//         await pc.setRemoteDescription(offer);
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         socket.emit("answer", answer);
//       });

//       socket.on("answer", async (answer) => {
//         await peerConnection.setRemoteDescription(answer);
//       });

//       socket.on("candidate", (candidate) => {
//         peerConnection.addIceCandidate(candidate);
//       });

//       // Set the created peer connection
//       setPeerConnection(pc);
//     }
//   }, [socket, localStream]);

//   return (
//     <View style={styles.container}>
//       {localStream && (
//         <RTCView
//           streamURL={localStream.toURL()}
//           style={styles.localVideo}
//         />
//       )}

//       {remoteStream && (
//         <RTCView
//           streamURL={remoteStream.toURL()}
//           style={styles.remoteVideo}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   localVideo: {
//     width: 200,
//     height: 150,
//   },
//   remoteVideo: {
//     flex: 1,
//   },
// });

// import React, { useEffect, useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";
// import io from "socket.io-client";

// const signalingServerUrl = "http://192.168.1.73:3000";

// export default function TestVideo() {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);

//   useEffect(() => {
//     const startLocalStream = async () => {
//       const stream = await mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setLocalStream(stream);
//     };
//     startLocalStream();
//   }, []);

//   useEffect(() => {
//     const socket = io.connect(signalingServerUrl);
//     setSocket(socket);
//     return () => {
//       socket.disconnect();
//       setSocket(null);
//     };
//   }, []);

//   useEffect(() => {
//     if (socket && localStream) {
//       const configuration = {
//         iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//       };
//       const pc = new RTCPeerConnection(configuration);

//       // Add local stream to peer connection
//       localStream.getTracks().forEach((track) => {
//         pc.addTrack(track, localStream);
//       });

//       // Handle remote track
//       pc.ontrack = (event) => {
//         if (event.streams && event.streams[0]) {
//           setRemoteStream(event.streams[0]);
//         }
//       };
//       // Set the peer connection
//       setPeerConnection(pc);

//       socket.on("offer", async (offer) => {
//         await pc.setRemoteDescription(offer);
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         socket.emit("answer", answer);
//       });

//       socket.on("answer", async (answer) => {
//         await peerConnection.setRemoteDescription(answer);
//       });

//       socket.on("candidate", (candidate) => {
//         peerConnection.addIceCandidate(candidate);
//       });

//       // The rest of your signaling code here...
//       // Remember to also handle ICE candidates, offers, and answers.
//     }
//   }, [socket, localStream]);

//   // Additional useEffects for signaling (offer, answer, candidate) unchanged
//   // ...

//   return (
//     <View style={styles.container}>
//       {localStream && (
//         <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
//       )}
//       {remoteStream && (
//         <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   localVideo: {
//     width: 200,
//     height: 150,
//   },
//   remoteVideo: {
//     flex: 1,
//   },
// });

// import React, { useEffect, useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate } from "react-native-webrtc";
// import io from "socket.io-client";

// const signalingServerUrl = "http://192.168.1.73:3000";

// export default function TestVideo() {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);

//   useEffect(() => {
//     const startLocalStream = async () => {
//       try {
//         const stream = await mediaDevices.getUserMedia({
//           audio: true,
//           video: true,
//         });
//         setLocalStream(stream);
//       } catch (error) {
//         console.error("Error starting local stream:", error);
//       }
//     };
//     startLocalStream();
//   }, []);

//   useEffect(() => {
//     const socket = io.connect(signalingServerUrl);
//     setSocket(socket);

//     const configuration = {
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     };
//     const pc = new RTCPeerConnection(configuration);

//     pc.onicecandidate = ({ candidate }) => {
//       if (candidate) {
//         socket.emit("candidate", candidate);
//       }
//     };

//     pc.ontrack = (event) => {
//       if (event.streams && event.streams[0]) {
//         setRemoteStream(event.streams[0]);
//       }
//     };

//     setPeerConnection(pc);

//     return () => {
//       socket.disconnect();
//       setSocket(null);
//       localStream?.getTracks().forEach((track) => track.stop());
//       remoteStream?.getTracks().forEach((track) => track.stop());
//       pc.close();
//     };
//   }, []);

//   useEffect(() => {
//     if (socket && peerConnection && localStream) {
//       localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream);
//       });

//       socket.on("offer", async (offer) => {
//         await peerConnection.setRemoteDescription(offer);
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit("answer", answer);
//       });

//       socket.on("answer", async (answer) => {
//         await peerConnection.setRemoteDescription(answer);
//       });

//       socket.on("candidate", (candidate) => {
//         peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//       });
//     }
//   }, [socket, peerConnection, localStream]);

//   return (
//     <View style={styles.container}>
//       {localStream && (
//         <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
//       )}
//       {remoteStream && (
//         <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   localVideo: {
//     width: 200,
//     height: 150,
//   },
//   remoteVideo: {
//     flex: 1,
//   },
// });


// import React, { useEffect, useState } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import { mediaDevices, RTCView, RTCPeerConnection, RTCIceCandidate } from 'react-native-webrtc';
// import io from 'socket.io-client';

// const signalingServerUrl = 'http://192.168.1.73:3000';

// // Myles: 192.168.1.118
// // Thin Air: 192.168.1.73

//  const TestVideo = () => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);

//   useEffect(() => {
//     // Request permissions and get the local stream
//     const getLocalStream = async () => {
//       const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
//       setLocalStream(stream);
//     };

//     getLocalStream();

//     // Setup the socket connection to the signaling server
//     const newSocket = io(signalingServerUrl);
//     setSocket(newSocket);
//     return () => newSocket.close();
//   }, []);

//   const startCall = async () => {
//     const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
//     const pc = new RTCPeerConnection(configuration);

//     // Add the local stream tracks to the RTCPeerConnection
//     localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit('candidate', event.candidate);
//       }
//     };

//     pc.ontrack = (event) => {
//       if (event.streams && event.streams[0]) {
//         setRemoteStream(event.streams[0]);
//       }
//     };

//     setPeerConnection(pc);

//     // Create an offer and set the local description
//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     // Send the offer to the remote peer through the signaling server
//     socket.emit('offer', offer);

//     // Listen for answer from the signaling server
//     socket.on('answer', async (answer) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     // Listen for ICE candidates from the signaling server
//     socket.on('candidate', (candidate) => {
//       pc.addIceCandidate(new RTCIceCandidate(candidate));
//     });
//   };

//   useEffect(() => {
//     if (socket) {
//       // Listen for offers from the signaling server
//       socket.on('offer', async (offer) => {
//         if (!peerConnection) startCall();
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit('answer', answer);
//       });

//       // Listen for ICE candidates from the signaling server
//       socket.on('candidate', (candidate) => {
//         peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//       });
//     }
//   }, [socket, peerConnection]);

//   return (
//     <View style={styles.container}>
//       <Button title="Start Call" onPress={startCall} />
//       {localStream && (
//         <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
//       )}
//       {remoteStream && (
//         <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   localVideo: {
//     width: 500,
//     height: 350,
//     backgroundColor: 'black',
//   },
//   remoteVideo: {
//     width: 500,
//     height: 300,
//     backgroundColor: 'black',
//   },
// });

// export default TestVideo;
