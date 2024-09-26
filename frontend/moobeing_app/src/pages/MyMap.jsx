// import React, { useState, useEffect } from "react";
// import {
//   NaverMap,
//   useNavermaps,
//   Marker,
//   Container as MapDiv,
// } from "react-naver-maps";

// function MyMap() {
//   const navermaps = useNavermaps();
//   const [map, setMap] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null);

//   function onSuccessGeolocation(position) {
//     if (!map) return;

//     const location = new navermaps.LatLng(
//       position.coords.latitude,
//       position.coords.longitude
//     );
//     setCurrentLocation(location);
//     map.setCenter(location);
//     map.setZoom(14);
//     console.log("Coordinates: " + location.toString());
//   }

//   function onErrorGeolocation() {
//     console.error("위치 정보를 가져올 수 없습니다.");
//   }

//   useEffect(() => {
//     if (!map) return;

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         onSuccessGeolocation,
//         onErrorGeolocation
//       );
//     } else {
//       console.error("Geolocation이 지원되지 않습니다");
//     }
//   }, [map]);

//   return (
//     <MapDiv
//       style={{
//         width: "100%",
//         height: "600px",
//       }}
//     >
//       <NaverMap
//         defaultCenter={new navermaps.LatLng(37.5666805, 126.9784147)}
//         defaultZoom={10}
//         defaultMapTypeId={navermaps.MapTypeId.NORMAL}
//         ref={setMap}
//       >
//         {currentLocation && (
//           <Marker
//             position={currentLocation}
//             animation={navermaps.Animation.DROP}
//           />
//         )}
//       </NaverMap>
//     </MapDiv>
//   );
// }

// export default MyMap;
