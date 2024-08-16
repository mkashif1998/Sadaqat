// import { createContext, useContext, useEffect, useState } from "react";

// const Stream = createContext();

// export const StreamContextProvider = ({ children }) => {
//   const [data, setData] = useState([]);
//   const urls = [
//     "https://media-wrtc.swatitech.com/SecureEye/play.html?id=swati_web202",
//   ];

//   useEffect(() => {
//     const sockets = [
//       { name: "personSocket", socket: new WebSocket("ws://36.50.13.21:8765") },
//       { name: "fightSocket", socket: new WebSocket("ws://36.50.13.21:8766") },
//       {
//         name: "fireSmokeSocket",
//         socket: new WebSocket("ws://36.50.13.21:8767"),
//       },
//       { name: "personInOut", socket: new WebSocket("ws://36.50.13.21:8768") },
//       {
//         name: "employeeStation",
//         socket: new WebSocket("ws://36.50.13.21:8769"),
//       },
//       { name: "gaurdStatus", socket: new WebSocket("ws://36.50.13.21:8770") },
//       { name: "vehicleCount", socket: new WebSocket("ws://36.50.13.21:8771") },
//     ];

//     const socketData = {};

//     sockets.forEach(({ name, socket }) => {
//       socket.onopen = () => {
//         console.log(`Connected to ${name}`);
//       };

//       socket.onmessage = (event) => {
//         socketData[name] = event.data;
//         const combinedData = Object.values(socketData).join(". ");
//         setData((prevData) => [
//           ...prevData,
//           {
//             response: combinedData,
//           },
//         ]);
//       };

//       socket.onerror = (error) => {
//         console.error(`Error with ${name}:`, error);
//       };
//     });

//     return () => {
//       sockets.forEach(({ socket }) => {
//         socket.close();
//       });
//     };
//   }, []);

//   return <Stream.Provider value={{ data, urls }}>{children}</Stream.Provider>;
// };

// export const useStream = () => useContext(Stream);

import { createContext, useContext, useEffect, useState } from "react";

const Stream = createContext();

export const StreamContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const urls = [
    "https://media-wrtc.swatitech.com/SecureEye/play.html?id=swati_web202",
  ];

  useEffect(() => {
    const sockets = [
      { name: "personSocket", socket: new WebSocket("ws://36.50.13.21:8765") },
      { name: "fightSocket", socket: new WebSocket("ws://36.50.13.21:8766") },
      {
        name: "fireSmokeSocket",
        socket: new WebSocket("ws://36.50.13.21:8767"),
      },
      { name: "personInOut", socket: new WebSocket("ws://36.50.13.21:8768") },
      {
        name: "employeeStation",
        socket: new WebSocket("ws://36.50.13.21:8769"),
      },
      { name: "gaurdStatus", socket: new WebSocket("ws://36.50.13.21:8770") },
      { name: "vehicleCount", socket: new WebSocket("ws://36.50.13.21:8771") },
    ];

    sockets.forEach(({ name, socket }) => {
      socket.onopen = () => {
        console.log(`Connected to ${name}`);
      };

      socket.onmessage = (event) => {
        setData((prevData) => ({
          ...prevData,
          [name]: event.data,
        }));
      };

      socket.onerror = (error) => {
        console.error(`Error with ${name}:`, error);
      };
    });

    return () => {
      sockets.forEach(({ socket }) => {
        socket.close();
      });
    };
  }, []);

  return <Stream.Provider value={{ data, urls }}>{children}</Stream.Provider>;
};

export const useStream = () => useContext(Stream);
