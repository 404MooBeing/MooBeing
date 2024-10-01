import { create } from "zustand";

const useCapsuleStore = create((set) => ({
  // 초기 상태 정의
  transactionName: "",
  transactionAmount: 0,
  transactionDate: "",
  imgFile: "", // null could be possible
  description: "",
  type: "", // SMALL_RADISH, MEDIUM_RADISH, LARGE_RADISH
  radishId: "",
  harvestAt: "",
  lat: 0,
  lng: 0,
  addressName: "",
  placeName: "",

  // 그룹 1: 거래 정보 업데이트 함수
  updateTransactionInfo: (name, amount, date) =>
    set((state) => ({
      transactionName: name,
      transactionAmount: amount,
      transactionDate: date,
    })),

  // 그룹 2: 이미지 파일 및 설명 업데이트 함수
  updateImgAndDescription: (file, desc) =>
    set((state) => ({
      imgFile: file,
      description: desc,
    })),

  // 그룹 3: 타입 및 수확 정보 업데이트 함수
  updateRadishInfo: (type, id, harvestAt) =>
    set((state) => ({
      type: type,
      radishId: id,
      harvestAt: harvestAt,
    })),

  // 그룹 4: 위치 정보 업데이트 함수
  updateLocationInfo: (lat, lng, addressName, placeName) =>
    set((state) => ({
      lat: lat,
      lng: lng,
      addressName: addressName,
      placeName: placeName,
    })),
}));

export default useCapsuleStore;
