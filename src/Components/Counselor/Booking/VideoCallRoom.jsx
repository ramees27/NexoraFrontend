// VideoCall.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';

const VideoCall = () => {
  const { bookingId, userId } = useParams();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const connectionRef = useRef(null);

  const [connectionId, setConnectionId] = useState('');
  const [remoteConnectionId, setRemoteConnectionId] = useState(userId || '');
  const [isCallStarted, setIsCallStarted] = useState(false);

  // WebRTC config (STUN servers)
  const rtcConfig = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      // Add TURN servers here if needed
    ],
  };

  useEffect(() => {
    const initSignalR = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:7118/videoHub') // Change this URL
        .withAutomaticReconnect()
        .build();

      connection.on('ReceiveConnectionId', (id) => {
        setConnectionId(id);
        console.log('My connection ID:', id);
      });

      connection.on('ReceiveOffer', async (fromConnectionId, offer) => {
        console.log('Received offer from:', fromConnectionId);
        await handleReceivedOffer(fromConnectionId, JSON.parse(offer));
      });

      connection.on('ReceiveAnswer', async (fromConnectionId, answer) => {
        console.log('Received answer from:', fromConnectionId);
        await handleReceivedAnswer(JSON.parse(answer));
      });

      connection.on('ReceiveIceCandidate', async (fromConnectionId, candidate) => {
        console.log('Received ICE candidate from:', fromConnectionId);
        if (peerConnectionRef.current) {
          try {
            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
          } catch (err) {
            console.error('Error adding received ice candidate', err);
          }
        }
      });

      await connection.start();
      connectionRef.current = connection;
    };

    // Initialize SignalR connection
    initSignalR();

    // Get user media and show local stream
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    };

    getMedia();

    // Cleanup on unmount
    return () => {
      peerConnectionRef.current?.close();
      connectionRef.current?.stop();
    };
  }, []);

  // Start a call: create offer and send it
  const startCall = async () => {
    if (!connectionRef.current || !localVideoRef.current?.srcObject) return;

    peerConnectionRef.current = new RTCPeerConnection(rtcConfig);

    // Add local tracks to peer connection
    localVideoRef.current.srcObject.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localVideoRef.current.srcObject);
    });

    // Handle remote tracks
    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Send ICE candidates to remote peer
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        connectionRef.current.invoke('SendIceCandidate', remoteConnectionId, JSON.stringify(event.candidate));
      }
    };

    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      // Send offer through SignalR to remote peer
      await connectionRef.current.invoke('SendOffer', remoteConnectionId, JSON.stringify(offer));
      setIsCallStarted(true);
    } catch (err) {
      console.error('Error creating offer:', err);
    }
  };

  // Handle received offer: set remote desc, create answer, send it back
  const handleReceivedOffer = async (fromConnectionId, offer) => {
    if (!connectionRef.current || !localVideoRef.current?.srcObject) return;

    setRemoteConnectionId(fromConnectionId);

    peerConnectionRef.current = new RTCPeerConnection(rtcConfig);

    // Add local tracks
    localVideoRef.current.srcObject.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localVideoRef.current.srcObject);
    });

    // Handle remote tracks
    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Handle ICE candidates
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        connectionRef.current.invoke('SendIceCandidate', fromConnectionId, JSON.stringify(event.candidate));
      }
    };

    try {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      // Send answer back to caller
      await connectionRef.current.invoke('SendAnswer', fromConnectionId, JSON.stringify(answer));
      setIsCallStarted(true);
    } catch (err) {
      console.error('Error handling offer:', err);
    }
  };

  // Handle received answer: set remote description
  const handleReceivedAnswer = async (answer) => {
    try {
      await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (err) {
      console.error('Error setting remote description (answer):', err);
    }
  };

  // End the call
  const endCall = () => {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    setIsCallStarted(false);
  };

  return (
    <div className="flex flex-col items-center p-6 gap-6">
      <h1 className="text-xl font-bold">Video Call</h1>
      <p>Booking ID: {bookingId}</p>
      <p>My Connection ID: {connectionId}</p>
      <p>Remote Connection ID: {remoteConnectionId}</p>

      <div className="flex gap-6">
        <video ref={localVideoRef} autoPlay muted playsInline className="w-64 h-48 border rounded" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-64 h-48 border rounded" />
      </div>

      <div className="flex gap-4 mt-4">
        {!isCallStarted ? (
          <button
            onClick={startCall}
            disabled={!remoteConnectionId}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Start Call
          </button>
        ) : (
          <button onClick={endCall} className="bg-red-600 text-white px-4 py-2 rounded">
            End Call
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
