import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import goToJourney from "../../assets/button/goToJourney.svg";
import leftButton from "../../assets/button/leftButton.svg";
import rightButton from "../../assets/button/rightButton.svg";
import leftButtonBlack from "../../assets/button/leftButtonBlack.svg";
import rightButtonBlack from "../../assets/button/rightButtonBlack.svg";
import basicRad from "../../assets/radishes/basicRad.png";
import ibk from "../../assets/banks/금융아이콘_SVG_IBK.svg";
import kb from "../../assets/banks/금융아이콘_SVG_KB.svg";
import mg from "../../assets/banks/금융아이콘_SVG_MG새마을금고.svg";
import nh from "../../assets/banks/금융아이콘_SVG_농협.svg";
import shinhan from "../../assets/banks/금융아이콘_SVG_신한.svg";
import uri from "../../assets/banks/금융아이콘_SVG_우리.svg";
import kakaoBank from "../../assets/banks/금융아이콘_SVG_카카오뱅크.svg";
import toss from "../../assets/banks/금융아이콘_SVG_토스.svg";
import hana from "../../assets/banks/금융아이콘_SVG_하나.svg";
import useUserStore from "../../store/UserStore";
import { getAccountInfo } from "../../apis/AccountApi";

const bankLogos = {
  ibk: ibk,
  kb: kb,
  mg: mg,
  nh: nh,
  shinhan: shinhan,
  uri: uri,
  kakaoBank: kakaoBank,
  toss: toss,
  hana: hana,
};

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
  const { accounts, setAccounts } = useUserStore();
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const accountsPerPage = 3;
  const totalPages = Math.ceil(accounts.length / accountsPerPage);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAccounts = async () => {
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
          setAccounts(processedAccounts); // Store에 계좌 정보 저장
        } else {
          console.error("계좌 목록이 배열이 아닙니다.");
        }
      } catch (error) {
        console.error("계좌 정보 불러오기 실패:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchAccounts();
  }, [setAccounts]);

  const handleScrollNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + accountsPerPage;
      // 마지막 페이지를 넘어가면 첫 번째 페이지로 돌아가게 함
      return nextIndex >= accounts.length ? 0 : nextIndex;
    });
  };
  
  const handleScrollPrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - accountsPerPage;
      // 첫 번째 페이지에서 이전 버튼을 누르면 마지막 페이지로 이동
      if (prevIndexNew < 0) {
        const remainingAccounts = accounts.length % accountsPerPage;
        const lastIndex = remainingAccounts === 0
          ? accounts.length - accountsPerPage
          : accounts.length - remainingAccounts;
        return lastIndex;
      }
      return prevIndexNew;
    });
  };

  const navigateToTransaction = (account) => {
    const encodedAccountName = encodeURIComponent(account.accountName);
    navigate(`/transaction-history/${encodedAccountName}`, {
      state: { account },
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
                onClick={() => navigateToTransaction(account)}
              >
                <BankLogo src={bankLogos[account.bankImageUrl]} alt="로고" />
                <AccountInfo>
                  <AccountName>
                    <div>{account.accountName}</div>
                    <NavigateButton>
                      <NavigateImage src={goToJourney} alt="계좌상세" />
                    </NavigateButton>
                  </AccountName>
                  <div>{account.remainingBalance.toLocaleString() || 0} 원</div>
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