package com.im.moobeing.domain.quiz.service;

import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.im.moobeing.domain.deal.dto.response.DealCategoryResponse;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.service.MemberService;
import com.im.moobeing.domain.quiz.dto.request.QuizAnswerRequest;
import com.im.moobeing.domain.quiz.dto.response.QuizAnswerResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizColdResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizDetailResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizResponse;
import com.im.moobeing.domain.quiz.entity.Quiz;
import com.im.moobeing.domain.quiz.entity.QuizInputAnswer;
import com.im.moobeing.domain.quiz.entity.QuizStatus;
import com.im.moobeing.domain.quiz.repository.QuizRepository;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.AuthenticationException;
import com.im.moobeing.global.error.exception.EntityNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizService {

	private static final Logger log = LoggerFactory.getLogger(QuizService.class);
	private final MemberService memberService;
	private final ExpenseService expenseService;
	private final QuizRepository quizRepository;

	@Transactional(readOnly = true)
	public List<QuizResponse> getQuizAll(Member member)
	{
		return quizRepository.findAllByMember(member)
							 .stream()
							 .map(QuizResponse::from)
							 .toList();
	}

	@Transactional(readOnly = true)
	public QuizDetailResponse getQuiz(Member member) {
		// 해당 번호에 대한 퀴즈가 없을때
		Quiz quiz = quizRepository.findByStatusAndMember(QuizStatus.NOT_STARTED, member)
								  .orElseThrow(() -> new EntityNotFoundException(
									  ErrorCode.QZ_NOT_FOUND_QUIZ));
		// 다른 사람의 퀴즈에 대한 접근을 요청할때
		if (!(quiz.getMember().getId().equals(member.getId()))){
			throw new AuthenticationException(ErrorCode.QZ_UNAUTHORIZED);
		}
		return QuizDetailResponse.from(quiz);
	}

	@Transactional(readOnly = true)
	public QuizColdResponse getQuizCold(Member member) {
		return QuizColdResponse.from(quizRepository.existsByMemberAndStatus(member, QuizStatus.NOT_STARTED));
	}

	@Transactional
	public QuizAnswerResponse confirmQuizAnswer(Member member, long quizNum, QuizAnswerRequest quizAnswerRequest) {
		// 해당 번호에 대한 퀴즈가 없을때
		Quiz quiz = quizRepository.findByQuizId(quizNum)
								  .orElseThrow(() -> new EntityNotFoundException(
									  ErrorCode.QZ_NOT_FOUND_QUIZ));
		// 다른 사람의 퀴즈에 대한 접근을 요청할때
		if (!(quiz.getMember().getId().equals(member.getId()))){
			throw new AuthenticationException(ErrorCode.QZ_UNAUTHORIZED);
		}
		quiz.updateCorrect(false);
		// 정답이 예시보다 크고 사용자도 같은 응답을 했을 경우
		if (quiz.getAnswer() >= quiz.getExample() && quizAnswerRequest.answer().equals(QuizInputAnswer.UP.getDisplayName()) ){
			quiz.updateCorrect(true);
		}else if (quiz.getAnswer() <= quiz.getExample() && quizAnswerRequest.answer().equals(QuizInputAnswer.DOWN.getDisplayName())){
			quiz.updateCorrect(true);
		}
		quiz.setQuizStatus(QuizStatus.DONE);

		quizRepository.save(quiz);

		String[] messages = {
			"저축을 시작하는 가장 좋은 방법은 월급의 일정 비율을 자동이체로 설정하는 거에요!",
			"필요한 것과 원하는 것을 구분하는 것이 현명한 소비의 첫걸음이에요.",
			"할인 상품이라도 꼭 필요한지 다시 한번 생각해보세요!",
			"가계부를 쓰는 습관이 돈을 아끼는 데 큰 도움이 돼요.",
			"카드 대신 현금을 사용하는 것도 과소비를 줄이는 방법이에요.",
			"월말이 되기 전에 예산을 체크하고 남은 금액을 확인해보세요.",
			"가장 비싼 선택이 항상 가장 좋은 선택은 아니에요!",
			"외식 대신 집에서 요리하면 식비를 절약할 수 있어요.",
			"소비를 줄이는 가장 쉬운 방법은 필요한 것을 미리 리스트로 작성하는 거에요.",
			"계획적인 소비가 자산을 불리는 지름길입니다!"
		};
		// 랜덤 객체 생성
		Random random = new Random();

		// 배열의 길이 내에서 랜덤 인덱스 생성
		int randomIndex = random.nextInt(messages.length);

		return QuizAnswerResponse.from(quiz, messages[randomIndex]);
	}


	@Transactional
	public void createQuiz(Member member){
		List<DealCategoryResponse> expenseForQuiz = expenseService.getExpenseForQuiz(member);
		if (expenseForQuiz.isEmpty()) {
			return;
		}
		Random random = new Random();
		int randomIdx = random.nextInt(expenseForQuiz.size());
		DealCategoryResponse expenseCategory = expenseForQuiz.get(randomIdx);
		// 퀴즈 결과를 랜덤으로 생성 0 -> up, 1 -> down
		int upOrDown = random.nextInt(2);
		// up 일 경우
		int answer = expenseCategory.getTotalPrice();
		int example;
		if (upOrDown % 2 == 0){
			// 10 % 더한 금액을 퀴즈 예시로 설정
			example = (int)(expenseCategory.getTotalPrice() * 1.1);
		}else {
			// 10 % 뺀 금액을 퀴즈 예시로 설정
			example = (int)(expenseCategory.getTotalPrice() * 0.9);
		}
		Quiz quiz = Quiz.builder()
						.member(member)
						.status(QuizStatus.NOT_STARTED)
						.example(example)
						.answer(answer)
						.build();
		quizRepository.save(quiz);
	}


	// 4 시 00 분에 이루어지는 스케쥴링
	@Transactional
	@Scheduled(cron = "0 0 4 * * MON")
	public void quizScheduler(){
		log.info("SCHEDULER WORKING");
		// 모든 회원들에게 퀴즈 1개씩 생성
		memberService.getAllMembers()
			.forEach(this::createQuiz);
	}

	@Transactional
	@Scheduled(cron = "0 0 0 * * MON")
	public void quizExpire(){
		log.info("SCHEDULER Expire");
		// 이전에 있던 모든 퀴즈들 만료 시키기
		quizRepository.updateAllByStatus(QuizStatus.EXPIRED);
	}

	@Transactional
	public String closeQuizAnswer(Member member, long quizNum) {
		Quiz quiz = quizRepository.findByQuizId(quizNum)
			.orElseThrow(() -> new EntityNotFoundException(
				ErrorCode.QZ_NOT_FOUND_QUIZ));
		quiz.setQuizStatus(QuizStatus.DONE);

		return "히히 퀴즈 너 잠깐 나가있어";
	}

	@Transactional
	public String openQuizAnswer(Member member, long quizNum) {
		Quiz quiz = quizRepository.findByQuizId(quizNum)
			.orElseThrow(() -> new EntityNotFoundException(
				ErrorCode.QZ_NOT_FOUND_QUIZ));
		quiz.setQuizStatus(QuizStatus.NOT_STARTED);

		return "히히 살아났다!!";
	}
}
