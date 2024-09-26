import React from "react";
import { NavermapsProvider } from "react-naver-maps";
import MyMap from "../components/CapsuleMap/MyMap"; // MyMap 컴포넌트의 실제 경로로 수정하세요

function Map() {
  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_MAP_CLIENT_ID}>
      <div className="App">
        <MyMap />
      </div>
    </NavermapsProvider>
  );
}

export default Map;
