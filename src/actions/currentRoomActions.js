import axios from "axios";
import uuid from "uuid";

import { SET_CURRENT_ROOM, UPDATE_MESSAGES, ADD_MESSAGE } from "./types";

const enterRoom = (roomId, socket) => dispatch => {
  socket.emit("room", { roomId });
  axios.get(`/api/v1/room/${roomId}`).then(res => {
    const room = res.data;
    dispatch({
      type: SET_CURRENT_ROOM,
      roomId,
      title: room.title,
      createBy: room.createBy,
      createAt: room.createAt,
      members: room.members,
      messages: room.messages,
      socket,
    });
  });
};

const leaveRoom = (roomId, socket) => dispatch => {
  socket.emit("leave room", { roomId });
  dispatch({
    type: SET_CURRENT_ROOM,
    roomId: null,
    title: null,
    createBy: null,
    createAt: null,
    members: null,
    messages: null,
    socket: null,
  });
};

const getMessagesFromServer = roomId => dispatch => {
  axios.get(`/api/v1/room/${roomId}/messages`).then(messages => {
    dispatch({
      type: UPDATE_MESSAGES,
      roomId,
      messages,
    });
  });
};

const addMessage = message => {
  const { messageId, createBy, createAt, content } = message;
  return {
    type: ADD_MESSAGE,
    messageId,
    createBy,
    createAt,
    content,
  };
};

const sendMessage = (roomId, socket, createBy, content) => dispatch => {
  const messageId = uuid.v4();
  const createAt = Date.now().toString();
  socket.emit("message", {
    roomId,
    messageId,
    createBy,
    createAt,
    content,
  });
  dispatch(
    addMessage({
      messageId,
      createBy,
      createAt,
      content,
    }),
  );
};

const receiveMessage = (messageId, createBy, createAt, content) => dispatch => {
  dispatch(
    addMessage({
      messageId,
      createBy,
      createAt,
      content,
    }),
  );
};

export {
  enterRoom,
  leaveRoom,
  getMessagesFromServer,
  sendMessage,
  receiveMessage,
};
