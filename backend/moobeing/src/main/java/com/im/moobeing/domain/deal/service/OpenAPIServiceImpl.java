package com.im.moobeing.domain.deal.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.im.moobeing.domain.deal.dto.request.OpenAIRequest;
import com.im.moobeing.domain.deal.dto.response.GetDrawPiChartResponse;
import com.im.moobeing.domain.deal.dto.response.MoobtiResponse;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.entity.OpenAIRole;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
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

    @Override
    public MoobtiResponse getMoobti(Member member) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openAiApiKey);
        headers.set("Content-Type", "application/json");
        ArrayList<OpenAIRequest> promptList = new ArrayList<>();
        // System 프롬프트
        promptList.add(
            new OpenAIRequest(OpenAIRole.system,
                "우리 서비스에서 사용자의 소비 내역을 분석해서 MBTI 처럼 소비 유형을 알려주는 기능을 제공하고자해 \n"
                    + "소비 내역 카테고리 별로 식비, 의료, 문화, 대출, 유흥 이렇게 5가지 항목이 있고\n"
                    + "각각에 사용하는 금액 퍼센트에 따라서 소비 유형을 분류하려해\n"
                    + "소비 카테고리가 5개이기 때문에 각 카테고리가 20%에서 얼마나 멀어져 있는지에 따라서 \n"
                    + "해당 카테고리의 %을 0~ 100% 로 나타내려고해 \n"
                    + "\n"
                    + "20% 라면 50%, 0~20% 는 0~50% 로, 20~80% 는 50% ~ 100%로 변환할겨야\n"
                    + "그리고 카테고리들의 변환한%가 50을 넘는지 안넘는지에 따라서 사용자의 유형을 분류할거야\n"
                    + "5개의 유형이므로 32개의 카테고리가 있겠지?\n"
                    + "\n"
                    + "각 유형은 다음과 같아\n"
                    + "\n"
                    + "{\n"
                    + "  \"1\": {\n"
                    + "    \"name\": \"미래 준비형\",\n"
                    + "    \"description\": \"책임감 넘치는 분이시네요! 대출 상환에 신경을 많이 쓰시면서 미래를 차근차근 준비하는 모습입니다.\"\n"
                    + "  },\n"
                    + "  \"2\": {\n"
                    + "    \"name\": \"짠테크 고수형\",\n"
                    + "    \"description\": \"알뜰하고 실속 있게 생활하시는 분이시군요! 필요한 곳에만 딱딱 쓰는 절약의 고수입니다.\"\n"
                    + "  },\n"
                    + "  \"3\": {\n"
                    + "    \"name\": \"인생 즐기기형\",\n"
                    + "    \"description\": \"인생을 즐기며 사시는 분이시네요! 유흥과 즐거움을 잊지 않는 멋진 라이프스타일을 가지고 계시군요.\"\n"
                    + "  },\n"
                    + "  \"4\": {\n"
                    + "    \"name\": \"문화 탐닉형\",\n"
                    + "    \"description\": \"예술과 문화를 사랑하는 분이시군요! 공연, 전시회를 즐기며 감성을 충전하는 시간을 소중히 하시는 모습입니다.\"\n"
                    + "  },\n"
                    + "  \"5\": {\n"
                    + "    \"name\": \"건강 챙기기형\",\n"
                    + "    \"description\": \"건강이 최우선! 몸과 마음을 위해 아낌없이 투자하며 웰빙을 실천하는 분이시군요.\"\n"
                    + "  },\n"
                    + "  \"6\": {\n"
                    + "    \"name\": \"맛집 탐방형\",\n"
                    + "    \"description\": \"미식가이시군요! 맛있는 음식을 찾아다니며 소소한 행복을 즐기시는 분입니다.\"\n"
                    + "  },\n"
                    + "  \"7\": {\n"
                    + "    \"name\": \"균형 잡힌 생활형\",\n"
                    + "    \"description\": \"모든 것을 균형 있게! 고르게 소비하면서도 알찬 생활을 유지하는 분이십니다.\"\n"
                    + "  },\n"
                    + "  \"8\": {\n"
                    + "    \"name\": \"대출 플렉스형\",\n"
                    + "    \"description\": \"현실과 즐거움을 모두 챙기시는 분이시네요! 대출도 신경 쓰면서 즐거움을 놓치지 않는 삶을 사시는군요.\"\n"
                    + "  },\n"
                    + "  \"9\": {\n"
                    + "    \"name\": \"건강-안정형\",\n"
                    + "    \"description\": \"건강과 경제적 안정을 동시에 챙기시는 분이군요. 몸도, 마음도, 재정도 모두 든든합니다!\"\n"
                    + "  },\n"
                    + "  \"10\": {\n"
                    + "    \"name\": \"웰빙 미식가형\",\n"
                    + "    \"description\": \"몸도 마음도 건강하게! 맛있는 음식과 건강을 동시에 챙기며 사시는 분이시네요.\"\n"
                    + "  },\n"
                    + "  \"11\": {\n"
                    + "    \"name\": \"문화 미식형\",\n"
                    + "    \"description\": \"미식과 문화를 사랑하는 멋진 분이시네요! 세련된 라이프스타일을 추구하시는군요.\"\n"
                    + "  },\n"
                    + "  \"12\": {\n"
                    + "    \"name\": \"문화 웰빙러형\",\n"
                    + "    \"description\": \"건강과 문화를 모두 놓치지 않는 분이시네요! 균형 잡힌 생활을 하시는 모습이 인상적입니다.\"\n"
                    + "  },\n"
                    + "  \"13\": {\n"
                    + "    \"name\": \"미식 플렉스형\",\n"
                    + "    \"description\": \"맛있는 음식과 즐거움을 동시에! 인생을 즐기며 사시는 멋진 분이십니다.\"\n"
                    + "  },\n"
                    + "  \"14\": {\n"
                    + "    \"name\": \"건강한 플렉스형\",\n"
                    + "    \"description\": \"유흥도 즐기면서 건강도 잘 챙기시는 분이시네요! 완벽한 밸런스를 추구하는 모습입니다.\"\n"
                    + "  },\n"
                    + "  \"15\": {\n"
                    + "    \"name\": \"현실 도피형\",\n"
                    + "    \"description\": \"대출에 신경 쓰면서도 가끔은 스트레스를 풀어야죠! 즐거움을 찾는 여유도 잊지 않는 분입니다.\"\n"
                    + "  },\n"
                    + "  \"16\": {\n"
                    + "    \"name\": \"다채로운 삶형\",\n"
                    + "    \"description\": \"다양한 경험을 즐기시는 분이시군요! 문화와 유흥을 고루 즐기며 인생을 알차게 사십니다.\"\n"
                    + "  },\n"
                    + "  \"17\": {\n"
                    + "    \"name\": \"미식 탐닉형\",\n"
                    + "    \"description\": \"맛있는 음식을 사랑하시는 분이군요! 여유로운 삶을 즐기며 미식의 세계를 탐험하시는 모습이 멋집니다.\"\n"
                    + "  },\n"
                    + "  \"18\": {\n"
                    + "    \"name\": \"안정 지향형\",\n"
                    + "    \"description\": \"건강과 재정적 안정을 꼼꼼히 챙기시는 분이시네요! 든든한 삶을 사는 분입니다.\"\n"
                    + "  },\n"
                    + "  \"19\": {\n"
                    + "    \"name\": \"모험가형\",\n"
                    + "    \"description\": \"새로운 것에 도전하는 분이시네요! 미식과 문화를 탐험하며 끊임없이 새로운 경험을 쌓아가십니다.\"\n"
                    + "  },\n"
                    + "  \"20\": {\n"
                    + "    \"name\": \"웰빙 모험가형\",\n"
                    + "    \"description\": \"건강도 챙기면서 문화를 탐험하시는 멋진 분이시네요! 균형 잡힌 모험을 즐기시는 모습입니다.\"\n"
                    + "  },\n"
                    + "  \"21\": {\n"
                    + "    \"name\": \"대출 모험형\",\n"
                    + "    \"description\": \"대출 상환도 잊지 않으면서 문화를 즐기며 모험을 멈추지 않는 분이시네요!\"\n"
                    + "  },\n"
                    + "  \"22\": {\n"
                    + "    \"name\": \"휴식형\",\n"
                    + "    \"description\": \"유흥과 문화를 고루 즐기며 여가를 소중히 하는 분이시군요! 여유로운 시간을 잘 보내시는 모습입니다.\"\n"
                    + "  },\n"
                    + "  \"23\": {\n"
                    + "    \"name\": \"여유로운 삶형\",\n"
                    + "    \"description\": \"대출 걱정 없이 여가와 즐거움을 누리며 인생을 여유롭게 사시는 분이시네요!\"\n"
                    + "  },\n"
                    + "  \"24\": {\n"
                    + "    \"name\": \"건강한 여유형\",\n"
                    + "    \"description\": \"건강을 잘 챙기면서도 여유로운 삶을 추구하는 분이시네요! 몸과 마음이 모두 건강합니다.\"\n"
                    + "  },\n"
                    + "  \"25\": {\n"
                    + "    \"name\": \"미식 여가형\",\n"
                    + "    \"description\": \"미식과 여가를 즐기며 소소한 행복을 누리시는 분이군요! 여유롭고 맛있는 삶을 사시는 모습입니다.\"\n"
                    + "  },\n"
                    + "  \"26\": {\n"
                    + "    \"name\": \"실속파형\",\n"
                    + "    \"description\": \"실속 있게 소비하는 분이시네요! 대출 외에는 꼭 필요한 곳에만 소비하며 알뜰한 생활을 하십니다.\"\n"
                    + "  },\n"
                    + "  \"27\": {\n"
                    + "    \"name\": \"웰빙 안정형\",\n"
                    + "    \"description\": \"건강도, 재정도 안정적으로 관리하는 분이시네요! 균형 잡힌 삶을 추구하는 모습이 멋집니다.\"\n"
                    + "  },\n"
                    + "  \"28\": {\n"
                    + "    \"name\": \"다채로운 인생형\",\n"
                    + "    \"description\": \"다양한 경험을 즐기며 인생을 다채롭게 살아가시는 분이시군요! 문화와 유흥을 모두 챙기시는 모습이 인상적입니다.\"\n"
                    + "  },\n"
                    + "  \"29\": {\n"
                    + "    \"name\": \"안정된 즐거움형\",\n"
                    + "    \"description\": \"재정적 안정을 유지하면서도 여가와 즐거움을 잊지 않는 분이시네요! 균형 있는 삶을 사십니다.\"\n"
                    + "  },\n"
                    + "  \"30\": {\n"
                    + "    \"name\": \"안정된 문화형\",\n"
                    + "    \"description\": \"경제적 안정을 유지하면서 문화를 즐기는 멋진 분이시군요! 균형 잡힌 생활을 추구하는 모습이 돋보입니다.\"\n"
                    + "  },\n"
                    + "  \"31\": {\n"
                    + "    \"name\": \"건강 탐구형\",\n"
                    + "    \"description\": \"건강과 문화를 동시에 탐구하며 즐거움을 찾는 분이시네요! 몸과 마음을 위한 멋진 여정을 이어가십니다.\"\n"
                    + "  },\n"
                    + "  \"32\": {\n"
                    + "    \"name\": \"다채로운 모험형\",\n"
                    + "    \"description\": \"미식, 문화, 유흥을 모두 즐기며 모험적인 삶을 사시는 분이시군요! 새로운 것을 찾아 나서는 멋진 분입니다.\"\n"
                    + "  }\n"
                    + "}\n"
                    + "\n"
                    + "이제 너는 소비 내역 분석기가 되어 내가 주는 소비 내역을 보고 \n"
                    + "유형 이름과 description, 각 카테고리별로 변환한 %을 json 으로 묶어서 보여줘\n"
                    + "다른 말은 하지 말고 json 만 보내\n"
                    + "\n"
                    + "변환할 json 포맷은 다음과 같아\n"
                    + "{\n"
                    + "type: 유형,\n"
                    + "description : 유형 설명\n"
                    + ",categories : [ 카테고리 이름 :  변환한 카테고리 % ]\n"
                    + "}\n"
                    + "  ]\n\n"));
        // 사용자 정보 넣는 부분 추가
        LocalDateTime now = LocalDateTime.now();
        GetDrawPiChartResponse getDrawPiChartResponse = dealService.drawPiChart(member,
            now.getYear(), now.getMonthValue() - 1);
        promptList.add(new OpenAIRequest(OpenAIRole.system, getDrawPiChartResponse.getGetCategoryListDtoList().toString()));
        Map<String, Object> requestBody = new HashMap<>();
        // 사용할 모델 정보
        requestBody.put("model", "gpt-4o");
        // 응답으로 받을 최대 토큰 수
        requestBody.put("messages", promptList);
        try {
            String requestJson = objectMapper.writeValueAsString(requestBody);
            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);
            ResponseEntity<String> response = restTemplate.exchange(OPENAI_API_URL, HttpMethod.POST,
                entity, String.class);
            log.info(response.getBody());
//            if (response.getStatusCode() == HttpStatus.OK) {
////                log.info(response.getBody());
//            } else {
////                throw new OpenAiException();
//            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}
