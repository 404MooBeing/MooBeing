import { create } from 'zustand';

// 더미 데이터 정의
const dummySpendData = [
  {
    "date": "2024-10-01",
    "totalSpend": -1000,
    "history": [
      {
        "title": "KFC",
        "categoryName": "식비",
        "price": -1000
      }
    ]
  }
];

const dummyPieChartData = [
  {
    "totalExpense": 5577861,
    "getPieChartList": [
      {
        "id": "교통",
        "label": "교통",
        "value": 90250,
        "color": "hsl(117, 70%, 50%)"
      },
      {
        "id": "식비",
        "label": "식비",
        "value": 287000,
        "color": "hsl(190, 70%, 50%)"
      },
      {
        "id": "유흥",
        "label": "유흥",
        "value": 502000,
        "color": "hsl(198, 70%, 50%)"
      },
      {
        "id": "문화",
        "label": "문화",
        "value": 120000,
        "color": "hsl(234, 70%, 50%)"
      },
      {
        "id": "건강",
        "label": "건강",
        "value": 320000,
        "color": "hsl(61, 96%, 81%)"
      },
      {
        "id": "대출",
        "label": "대출",
        "value": 4258611,
        "color": "hsl(250, 70%, 50%)"
      }
    ],
    "getCategoryList": [
      {
        "label": "교통",
        "percent": 1.618003747314607,
        "amount": 90250
      },
      {
        "label": "식비",
        "percent": 5.145341556557254,
        "amount": 287000
      },
      {
        "label": "유흥",
        "percent": 8.999865719134988,
        "amount": 502000
      },
      {
        "label": "문화",
        "percent": 2.1513623232992005,
        "amount": 120000
      },
      {
        "label": "건강",
        "percent": 5.736966195464534,
        "amount": 320000
      },
      {
        "label": "대출",
        "percent": 76.34846045822941,
        "amount": 4258611
      }
    ]
  }
];

const dummyCategoryList = [
  {
    "categoryName": "교통",
    "totalPrice": 0
  },
  {
    "categoryName": "식비",
    "totalPrice": 0
  },
  {
    "categoryName": "유흥",
    "totalPrice": 0
  },
  {
    "categoryName": "문화",
    "totalPrice": 0
  },
  {
    "categoryName": "건강",
    "totalPrice": 0
  },
  {
    "categoryName": "대출",
    "totalPrice": 0
  }
];

const useSpendStore = create((set) => ({
  spendData: dummySpendData,
  pieChartData: dummyPieChartData,
  spendCategory: dummyCategoryList,

  setSpendData: (newData) => set({
    spendData: newData || dummySpendData,  // 새로운 데이터가 없을 경우 더미 데이터 사용
  }),

  setPieChartData: (newData) => set({
    pieChartData: newData || dummyPieChartData,  // 새로운 데이터가 없을 경우 더미 데이터 사용
  }),

  setSpendCategory: (newData) => set({
    spendCategory: newData || dummyCategoryList,  // 새로운 데이터가 없을 경우 더미 데이터 사용
  }),
}));

export default useSpendStore;
