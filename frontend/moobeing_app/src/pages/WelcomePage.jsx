import SmileRadish from "../assets/radishes/smileRad.svg";
import styled from "styled-components";
import useUserStore from "../store/UserStore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountInfo, getAccountSum, getAccountBenefit, getSpendSummary } from "../apis/AccountApi";
import { getCreditRate } from "../apis/UserApi";
import { getLoanSum } from "../apis/LoanApi";
import { getRadishSummary } from "../apis/RadishApi";

const WelcomeDiv = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & .text-wrapper {
    color: #348833;
    font-size: 15px;
    letter-spacing: 0;
    line-height: normal;
    text-align: center;
  }

  & .element {
    height: 15%;
    width: 30%;
    object-fit: contain;
  }

  & .userName {
    font-weight: bold;
  }
`;

const Welcome = () => {
  const navigate = useNavigate();
  const { 
    userInfo, 
    setCreditRate, 
    setAccounts, 
    setTotalAccountAmount, 
    setLoanSum, 
    setAccountBenefit,
    setRadishSummary,
    setSpendSummary,
  } = useUserStore();

  // 계좌 배열 저장
  useEffect(() => {
    // API 호출 및 store에 저장
    const fetchAccountData = async () => {
      try {
        const accountData = await getAccountInfo();
        if (accountData && Array.isArray(accountData.getAccountDtoList)) {
          const processedAccounts = accountData.getAccountDtoList.map(account => ({
            id: account.id,
            bankImageUrl: account.bankImageUrl,
            accountName: account.accountName,
            accountNum: account.accountNum,
            remainingBalance: account.remainingBalance,
          }));
          setAccounts(processedAccounts); // store에 계좌 정보 저장
        } else {
          console.error("계좌 목록이 배열이 아닙니다.");
        }

        // 총 계좌 금액 API 호출
        const totalAmount = await getAccountSum();
        setTotalAccountAmount(totalAmount); // store에 총 금액 저장

      } catch (error) {
        console.error("계좌 정보 불러오기 실패:", error);
      }
    };

    fetchAccountData(); // 계좌 정보 호출
  }, [setAccounts, setTotalAccountAmount]);

  // 신용등급 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 신용등급 API 호출
        const creditData = await getCreditRate();
        setCreditRate({
          ratingName: creditData.ratingName,
          ratingPercent: Math.max(creditData.ratingPercent, 0),
        });

      } catch (error) {
        console.error("유저 데이터 불러오기 실패:", error);
      }
    };

    fetchUserData(); // 유저 데이터 및 신용등급 호출
  }, [setCreditRate]);

  // 계좌 대출 정보 가져오기
  useEffect(() => {
    // API 호출 및 store에 저장
    const fetchLoanData = async () => {
      try {
        const loanData = await getLoanSum();
        setLoanSum(loanData.sumLoanValue); // store에 대출 합계 저장
      } catch (error) {
        console.error("대출 총잔액 불러오기 실패:", error);
      }

      try {
        const accountBenefitData = await getAccountBenefit();
        setAccountBenefit(accountBenefitData); // store에 계좌 혜택 데이터 저장
      } catch (error) {
        console.error("계좌 혜택 데이터 가져오기 실패:", error);
      }
    };

    fetchLoanData(); // 데이터 호출
  }, [setLoanSum, setAccountBenefit]);

  // 무 관련 요약 데이터 가져오기
  useEffect(() => {
    const fetchRadishData = async () => {
      try {
        const summary = await getRadishSummary();
        setRadishSummary(summary); // store에 저장
      } catch (error) {
        console.error("무 요약 데이터를 가져오지 못했습니다.", error);
      }
    };

    fetchRadishData(); // API 호출
  }, [setRadishSummary]);

  // 내 지난달 소비 정보
  useEffect(() => {
    const fetchSpendData = async () => {
      try {
        const summary = await getSpendSummary();
        setSpendSummary(summary); // store에 저장
      } catch (error) {
        console.error("소비 요약 데이터를 가져오지 못했습니다.", error);
      }
    };

    fetchSpendData(); // API 호출
  }, [setSpendSummary]);

  // 2초 후에 홈으로
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // 홈 페이지로 이동
    }, 2000); // 2초 후

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigate]);


  return (
    <WelcomeDiv>
      <img className="element" alt="Element" src={SmileRadish} />
      <p className="text-wrapper">

        <span className="userName">{userInfo.name}</span>님, <br />
        환영해요!
      </p>
    </WelcomeDiv>
  );
};

export default Welcome;
