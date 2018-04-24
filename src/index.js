const P2P = require('socket.io-p2p');
const io = require('socket.io-client');
const Promise = require('bluebird');

const socket = io();
const p2pSocket = new P2P(socket);

const startButton = document.getElementById('start-stream');

const joinRoom = document.getElementById('join-room');
const roomInput = document.getElementById('room-input');
const roomButton = document.getElementById('join-room-btn');
const roomJoined = document.getElementById('room-joined');
const roomName = document.getElementById('room-name');
const usersInRoom = document.getElementById('users-in-room');

const AudioContext = window.AudioContext || window.webkitAudioContext;

socket.on('joined-room', ({ room, clients }) => {
  joinRoom.style.display = 'none';
  roomJoined.style.display = 'block';
  roomName.innerHTML = `You're in room: ${room}`;
  usersInRoom.innerHTML = `There ${clients > 1 ? 'are' : 'is'} currently ${clients} user${clients > 1 ? 's' : ''} in the room`;
});

function handleJoinRoom() {
  const room = roomInput.value;
  if (!room) return;
  roomInput.value = '';
  socket.emit('join-or-create', room);
}

roomButton.addEventListener('click', handleJoinRoom);
roomJoined.style.display = 'none';

// p2pSocket.on('stream', (stream) => {
//   p2pSocket.usePeerConnection = true;
//   const audio = document.querySelector('audio');
//   audio.srcObject = stream;
//   audio.play();
// });

// const getUserMedia = () =>
//   new Promise((resolve, reject) =>
//     navigator.getUserMedia({ audio: true }, resolve, reject));

// async function startStream() {
//   startButton.setAttribute('disabled', true);
//   try {
//     const stream = await getUserMedia({ audio: true });
//     const audioContext = new AudioContext();
//     const source = audioContext.createMediaStreamSource(stream);
//     const destination = audioContext.createMediaStreamDestination();
//     const socket = io();
//     const p2pSocket = new P2P(socket, { peerOpts: { stream: destination.stream } });

//     source.connect(destination);
//     p2pSocket.on('ready', () => p2pSocket.usePeerConnection = true);
//     p2pSocket.emit('ready', { peerId: p2pSocket.peerId });
//   } catch (err) {
//     console.error(err);
//   }
// }

// startButton.addEventListener('click', startStream);
