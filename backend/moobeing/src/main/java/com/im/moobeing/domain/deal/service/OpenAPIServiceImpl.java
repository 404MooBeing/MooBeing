package com.im.moobeing.domain.deal.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.im.moobeing.domain.deal.dto.CategoryPercentDto;
import com.im.moobeing.domain.deal.dto.GetCategoryListDto;
import com.im.moobeing.domain.deal.dto.MoobtiCharacterDto;
import com.im.moobeing.domain.deal.dto.request.OpenAIRequest;
import com.im.moobeing.domain.deal.dto.response.GetDrawPiChartResponse;
import com.im.moobeing.domain.deal.dto.response.MoobtiResponse;
import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.deal.repository.DealRepository;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.entity.OpenAIRole;
import com.im.moobeing.global.error.exception.OpenAIException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class OpenAPIServiceImpl implements OpenAPIService {

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private final RestTemplate restTemplate;
    private final DealService dealService;
    private final String openAiApiKey;
    private final ObjectMapper objectMapper;
    private final DealRepository dealRepository;

    @Override
    public String getReport(Member member) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openAiApiKey);
        headers.set("Content-Type", "application/json");
        ArrayList<OpenAIRequest> promptList = new ArrayList<>();
        // System 프롬프트
        promptList.add(
            new OpenAIRequest(OpenAIRole.system,
                "당신은 소비내역 분석기 입니다. 거래 내역을 보고 개선점, 좋은점 등 내역을 분석해서 300자 내외의 분석결과지를 보내주세요 각 거래는 (제목 금액(- 이면 지출)) 로 되어있습니다"
                    + "text 로만 보내주시고 * 과 같은 굵은글씨 쓰지마세요, 카테고리 이름 적지 마세요 " 
                    + "결과지의 시작은  이번달 소비내역 결과를 알려드리겠습니다 라고 해줘"));


        // 사용자 정보 넣는 부분 추가
        Map<String, Object> requestBody = new HashMap<>();

        LocalDateTime now = LocalDateTime.now();
        // 저번 달의 첫째 날 구하기
        LocalDateTime startDate = now.minusMonths(1).withDayOfMonth(1);

        // 저번 달의 마지막 날 구하기 (방법 1)
        LocalDateTime endDate = now.withDayOfMonth(1).minusDays(1);
        List<Deal> deals = dealRepository.findAllByMemberAndDateRange(
            member,
            startDate,
            endDate
        );
        promptList.add(new OpenAIRequest(OpenAIRole.system, deals.toString()));
        // 사용할 모델 정보
        requestBody.put("model", "gpt-4o");
        // 응답으로 받을 최대 토큰 수
        requestBody.put("messages", promptList);
        try {
            String requestJson = objectMapper.writeValueAsString(requestBody);
            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);
            ResponseEntity<String> response = restTemplate.exchange(OPENAI_API_URL, HttpMethod.POST,
                entity, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                return extractMessageField(response.getBody());
            } else {
                throw new OpenAIException("OpenAI 응답 오류");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static final String[] names = {
        "짠테크 고수형",
        "맛집 탐방형",
        "건강 챙기기형",
        "문화 탐닉형",
        "미래 준비형",
        "인생 즐기기형",
        "웰빙 미식가형",
        "문화 미식형",
        "실속파형",
        "미식 플렉스형",
        "문화 웰빙러형",
        "건강-안정형",
        "건강한 플렉스형",
        "대출 모험형",
        "다채로운 삶형",
        "현실 도피형",
        "웰빙 안정형",
        "안정 지향형",
        "건강한 여유형",
        "모험가형",
        "여유로운 삶형",
        "미식 여가형",
        "웰빙 모험가형",
        "다채로운 인생형",
        "건강 탐구형",
        "휴식형",
        "안정된 문화형",
        "안정된 즐거움형",
        "건강한 플렉스형",
        "미식 탐닉형",
        "다채로운 모험형",
        "균형 잡힌 생활형"
    };

    private static final String[] descriptions = {
        "알뜰하고 실속 있게 생활하시는 분이시군요! 필요한 곳에만 딱딱 쓰는 절약의 고수입니다.",
        "미식가이시군요! 맛있는 음식을 찾아다니며 소소한 행복을 즐기시는 분입니다.",
        "건강이 최우선! 몸과 마음을 위해 아낌없이 투자하며 웰빙을 실천하는 분이시군요.",
        "예술과 문화를 사랑하는 분이시군요! 공연, 전시회를 즐기며 감성을 충전하는 시간을 소중히 하시는 모습입니다.",
        "책임감 넘치는 분이시네요! 대출 상환에 신경을 많이 쓰시면서 미래를 차근차근 준비하는 모습입니다.",
        "인생을 즐기며 사시는 분이시네요! 유흥과 즐거움을 잊지 않는 멋진 라이프스타일을 가지고 계시군요.",
        "몸도 마음도 건강하게! 맛있는 음식과 건강을 동시에 챙기며 사시는 분이시네요.",
        "미식과 문화를 사랑하는 멋진 분이시네요! 세련된 라이프스타일을 추구하시는군요.",
        "실속 있게 소비하는 분이시네요! 대출 외에는 꼭 필요한 곳에만 소비하며 알뜰한 생활을 하십니다.",
        "맛있는 음식과 즐거움을 동시에! 인생을 즐기며 사시는 멋진 분이십니다.",
        "건강과 문화를 모두 놓치지 않는 분이시네요! 균형 잡힌 생활을 하시는 모습이 인상적입니다.",
        "건강과 경제적 안정을 동시에 챙기시는 분이군요. 몸도, 마음도, 재정도 모두 든든합니다!",
        "유흥도 즐기면서 건강도 잘 챙기시는 분이시네요! 완벽한 밸런스를 추구하는 모습입니다.",
        "대출 상환도 잊지 않으면서 문화를 즐기며 모험을 멈추지 않는 분이시네요!",
        "다양한 경험을 즐기시는 분이시군요! 문화와 유흥을 고루 즐기며 인생을 알차게 사십니다.",
        "대출에 신경 쓰면서도 가끔은 스트레스를 풀어야죠! 즐거움을 찾는 여유도 잊지 않는 분입니다.",
        "건강도, 재정도 안정적으로 관리하는 분이시네요! 균형 잡힌 삶을 추구하는 모습이 멋집니다.",
        "건강과 재정적 안정을 꼼꼼히 챙기시는 분이시네요! 든든한 삶을 사는 분입니다.",
        "건강을 잘 챙기면서도 여유로운 삶을 추구하는 분이시네요! 몸과 마음이 모두 건강합니다.",
        "새로운 것에 도전하는 분이시네요! 미식과 문화를 탐험하며 끊임없이 새로운 경험을 쌓아가십니다.", // 모험가무
        "대출 걱정 없이 여가와 즐거움을 누리며 인생을 여유롭게 사시는 분이시네요!",
        "미식과 여가를 즐기며 소소한 행복을 누리시는 분이군요! 여유롭고 맛있는 삶을 사시는 모습입니다.",
        "건강도 챙기면서 문화를 탐험하시는 멋진 분이시네요! 균형 잡힌 모험을 즐기시는 모습입니다.",
        "다양한 경험을 즐기며 인생을 다채롭게 살아가시는 분이시군요! 문화와 유흥을 모두 챙기시는 모습이 인상적입니다.",
        "건강과 문화를 동시에 탐구하며 즐거움을 찾는 분이시네요! 몸과 마음을 위한 멋진 여정을 이어가십니다.",
        "유흥과 문화를 고루 즐기며 여가를 소중히 하는 분이시군요! 여유로운 시간을 잘 보내시는 모습입니다.",
        "경제적 안정을 유지하면서 문화를 즐기는 멋진 분이시군요! 균형 잡힌 생활을 추구하는 모습이 돋보입니다.",
        "재정적 안정을 유지하면서도 여가와 즐거움을 잊지 않는 분이시네요! 균형 있는 삶을 사십니다.",
        "유흥도 즐기면서 건강도 잘 챙기시는 분이시네요! 완벽한 밸런스를 추구하는 모습입니다.",
        "맛있는 음식을 사랑하시는 분이군요! 여유로운 삶을 즐기며 미식의 세계를 탐험하시는 모습이 멋집니다.",
        "미식, 문화, 유흥을 모두 즐기며 모험적인 삶을 사시는 분이시군요! 새로운 것을 찾아 나서는 멋진 분입니다.",
        "모든 것을 균형 있게! 고르게 소비하면서도 알찬 생활을 유지하는 분이십니다."
    };

    private final static String[] images = new String[] {
            "jjantechgosu",
            "misicktamnick",
            "jjantechgosu",
            "jjantechgosu",
            "futureready",
            "jjantechgosu",
            "jjantechgosu",
            "munhwamisick",
            "Flex",
            "munhwamisick",
            "munhwamisick",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "mohumga",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "husick",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "jjantechgosu",
            "balancesaenghwal"
    };
    @Override
    public MoobtiResponse getMoobti(Member member) {
        // 사용자 정보 넣는 부분 추가
        LocalDateTime now = LocalDateTime.now();
        GetDrawPiChartResponse getDrawPiChartResponse = dealService.drawSortedPiChart(member,
            now.getYear(), now.getMonthValue() - 1);
        List<GetCategoryListDto> categoryList = getDrawPiChartResponse.getGetCategoryListDtoList();
        int[] ary = new int[6];
        for (int i = 0; i < 6; i++) {
            double percent = categoryList.get(i).getPercent(); // 카테고리의 소비 비율 (0에서 100 사이의 값)
            double M; // 변환된 값

            if (percent <= 20) {
                M = 2.5 * percent;
            } else {
                M = 50 + 0.625 * (percent - 20);
            }
            ary[i] = (int)M;
        }
        List<CategoryPercentDto> categoryPercentDtoList = new ArrayList<>();

        //식비, 의료, 문화, 대출, 유흥
        categoryPercentDtoList.add(new CategoryPercentDto("식비", ary[0]));
        categoryPercentDtoList.add(new CategoryPercentDto("의료", ary[5]));
        categoryPercentDtoList.add(new CategoryPercentDto("문화", ary[2]));
        categoryPercentDtoList.add(new CategoryPercentDto("대출", ary[1]));
        categoryPercentDtoList.add(new CategoryPercentDto("유흥", ary[3]));
        int idx = 0;
        for (int i = 0; i < 6; i++){
            if (i == 4)
                continue;
            if (ary[i] >= 50)
                idx ++;
            if (i != 5)
                idx <<= 1;
        }
        MoobtiCharacterDto moobtiCharacterDto = MoobtiCharacterDto.builder()
                                                                  .type("소비 유형")
                                                                  .imageUrl(images[idx] + "Rad")
                                                                  .name(names[idx])
                                                                  .description(descriptions[idx])
                                                                  .build();
        MoobtiResponse moobtiResponse = new MoobtiResponse(moobtiCharacterDto ,categoryPercentDtoList, member.getName(), now.minusMonths(1).getMonthValue());
        return moobtiResponse;
    }

    private String extractMessageField(String responseBody) {
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode messageNode = root.path("choices")
                                       .get(0)
                                       .path("message");

            String content = messageNode.path("content").asText();
            return content;
        } catch (Exception e) {
            throw new OpenAIException("OpenAI 파싱 오류");
        }
    }

}
