import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAccountInfo } from "../../apis/AccountApi";
import goToJourney from "../../assets/button/goToJourney.svg";
import leftButton from "../../assets/button/leftButton.svg";
import rightButton from "../../assets/button/rightButton.svg";
import leftButtonBlack from "../../assets/button/leftButtonBlack.svg";
import rightButtonBlack from "../../assets/button/rightButtonBlack.svg";
import NongHyup from "../../assets/banks/금융아이콘_SVG_농협.svg";
import ShinHan from "../../assets/banks/금융아이콘_SVG_신한.svg";
import WooRi from "../../assets/banks/금융아이콘_SVG_우리.svg";
import Hana from "../../assets/banks/금융아이콘_SVG_하나.svg";
import basicRad from "../../assets/radishes/basicRad.svg";

const BankLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;

  @media (min-width: 600px) {
    width: 45px;
    height: 45px;
    margin-right: 15px;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AccountName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;

  @media (min-width: 600px) {
    font-size: 18px;
  }
`;

const AccountItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 0px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const NavigateButton = styled.button`
  margin: 2px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: 800;
  font-size: 5px;
`;

const NavigateImage = styled.img`
  width: 14px;
  height: 14px;

  @media (min-width: 600px) {
    width: 16px;
    height: 16px;
  }
`;

const AccountListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 260px;
  overflow: hidden;
  margin-top: 20px;
`;

const AccountListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: hidden;
  width: 100%;
`;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const DownImage = styled.img`
  width: 20px;
  height: 20px;
`;

const PageInfo = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px;
  color: #858585;
`;

const NoAccountsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 6vh;
`;

const NoAccountsImage = styled.img`
  width: 70px;
  height: auto;
  margin: 15px 0px;

  @media (min-width: 600px) {
    width: 75px;
  }
`;

const NoAccountText = styled.p`
  font-size: 12px;
  color: #24272d;
  margin: 0;
`;

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const accountsPerPage = 3;
  const totalPages = Math.ceil(accounts.length / accountsPerPage);
  const navigate = useNavigate();

  // API 호출을 통한 계좌 정보 가져오기
  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const accountData = await getAccountInfo(); // API 호출
        console.log(accountData); // 데이터 구조 확인을 위한 콘솔 로그

        // accountData.getAccountDtoList를 상태에 저장
        if (accountData && Array.isArray(accountData.getAccountDtoList)) {
          const processedAccounts = accountData.getAccountDtoList.map(account => ({
            bankImageUrl: "", // 적절한 이미지 경로 추가 또는 매핑
            accountName: account.accountName,
            accountNum: account.accountNum,
            remainingBalance: account.balance,
          }));
          setAccounts(processedAccounts);
        } else {
          console.error("계좌 목록이 배열이 아닙니다.");
        }
      } catch (error) {
        console.error("계좌 정보 불러오기 실패:", error);
      }
    };

    fetchAccountInfo(); // 함수 실행
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const handleScrollNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + accountsPerPage;
      return nextIndex >= accounts.length ? 0 : nextIndex;
    });
  };

  const handleScrollPrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - accountsPerPage;
      return prevIndexNew < 0 ? accounts.length - accountsPerPage : prevIndexNew;
    });
  };

  const navigateToSpend = (account) => {
    const encodedAccountName = encodeURIComponent(account.accountName);
    navigate(`/transaction-history/${encodedAccountName}`, {
      state: { account, accounts },
    });
  };

  const visibleAccounts = accounts.slice(currentIndex, currentIndex + accountsPerPage);
  const currentPage = Math.floor(currentIndex / accountsPerPage) + 1;

  return (
    <>
      <AccountListContainer>
        <AccountListWrapper>
        {accounts.length > 0 ? (
            visibleAccounts.map((account, index) => (
              <AccountItem
                key={index}
                onClick={() => navigateToSpend(account)}
              >
                <BankLogo src={account.bankImageUrl || basicRad} alt="로고" />
                <AccountInfo>
                  <AccountName>
                    <div>{account.accountName}</div>
                    <NavigateButton>
                      <NavigateImage src={goToJourney} alt="계좌상세" />
                    </NavigateButton>
                  </AccountName>
                  <div>{account.remainingBalance.toLocaleString()} 원</div>
                </AccountInfo>
              </AccountItem>
            ))
          ) : (
            <NoAccountsContainer>
              <NoAccountsImage src={basicRad} alt="계좌 없음" />
              <NoAccountText>연결된 계좌가 없습니다.</NoAccountText>
            </NoAccountsContainer>
          )}
        </AccountListWrapper>
      </AccountListContainer>

      {accounts.length > 0 ? (
      <ScrollButton>
        <DownImage
          src={currentPage > 1 ? leftButtonBlack : leftButton}
          alt="이전"
          onClick={handleScrollPrev}
        />
        <PageInfo>
          {currentPage} / {totalPages}
        </PageInfo>
        <DownImage
          src={currentPage < totalPages ? rightButtonBlack : rightButton}
          alt="다음"
          onClick={handleScrollNext}
        />
      </ScrollButton>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default AccountList;