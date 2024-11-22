"use client"

import { io } from "socket.io-client";
import store from "@/store/store";
import { changeCoords } from "@/store/trackerReducer";
import { updateStop } from "@/store/stopReducer";
import { updateDriver } from "@/store/driverReducer";


class Socket {
  url: string;
  config: {
  }
  socket: any

  constructor() {
    this.url = "http://localhost:4000";
    this.config = {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 3,
      transports: ["websocket"],
    };

    this.socket = io(this.url, this.config)

    this.socket.on("connect", () => {
      console.log("connected to the server");
    });
    this.getAllBusLocations()
    this.getUpdatedStop()
    this.getUpdatedDriver()
  }

  getAllBusLocations() {
    this.socket.emit("join-room", "allBus")
    this.socket?.on("getAllBusLocation", (data: any) => {
      store.dispatch(changeCoords(data))
    });
  }

  stopAllBusLocations() {
    console.log('left')
    this.socket.emit("leave-room", "allBus")
  }

  getBusLocation(room: string, setData: any) {
    this.socket.emit("join-room", room);
    this.socket.on("getBusLocation", (data: any) => {
      setData(data)
    });
  }

  stopBusLocation(room: string) {
    console.log('left')
    this.socket.emit("leave-room", room);
  }

  getUpdatedStop() {
    this.socket.on("updateStop", (data: any) => {
      store.dispatch(updateStop(data))
    })
  }

  getUpdatedDriver() {
    this.socket.on("updateDriver", (data: any) => {
      store.dispatch(updateDriver(data))
    })
  }

  leaveRoom(room: string) {
    this.socket.emit("leave-room", room);
  }

  disconnectConnection() {
    this.socket.disconnect()
    console.log('disconnected')
  }


  errorConnection() {
    this.socket.on("connect_error", (err: any) => {
      console.log(`connect_error due to ${err}`);
    });
  }


  //   stopAllBusLocation() {
  //     this.socket.removeListener("getAllBusLocation");
  //   }
  //   getNewBusAndStopAdded(dispatch) {
  //     this.socket.on("newBusAdded", (data) => {
  //       dispatch(addBus(data));
  //     });
  //     this.socket.on("newStopAdded", (data) => {
  //       dispatch(addStop(data));
  //     });
  //     this.socket.on("stopDeleted", (data) => {
  //       dispatch(deleteStop(data));
  //     });
  //     this.socket.on("busDeleted", (data) => {
  //       dispatch(deleteBus(data));
  //     });
  //     this.socket.on("newAnnoucement", (data) => {
  //       dispatch(addAnnouncement(data));
  //     });
  //     this.socket.on("deleteAnnouncement", (data) => {
  //       dispatch(deleteAnnouncement(data));
  //     });
  //   }
}

const clientSocket = new Socket()
export default clientSocket 