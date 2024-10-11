package com.im.moobeing.global.filter;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class SessionAuthenticationFilter extends OncePerRequestFilter {
    private final MemberRepository memberRepository;

    public SessionAuthenticationFilter(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        HttpSession session = request.getSession(false); // 기존 세션 가져오기, 없으면 null 반환

        if (session == null) {
            throw new ServletException("No JSESSIONID cookie found, unauthorized access."); // 예외 발생
        }

        Long memberId = (Long) session.getAttribute("memberId"); // 세션에서 사용자 이름 가져오기
        Member member = memberRepository.findById(memberId).orElse(null);

        if (member != null) {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    member, null, List.of(new SimpleGrantedAuthority("DEFAULT_ROLE")));

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response); // 다음 필터로 요청 전달
    }
}
