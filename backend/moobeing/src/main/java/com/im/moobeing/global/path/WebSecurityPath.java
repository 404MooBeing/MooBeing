package com.im.moobeing.global.path;

import lombok.Getter;

@Getter
public enum WebSecurityPath {
    REQUIRE_AUTH_PATH("/user", "/user/pw", "/user/radish", "/quiz/**", "/user/select", "/credit/**", "/expense/**", "/loan/**","/account/**", "/user/baby", "/user/baby-merge", "/account/**", "/user/month-button", "/user/month-button-click", "/stream-cnt", "/user/streamCnt", "/radish/**", "/expense/**");

    private final String[] paths;

    WebSecurityPath(String... paths) {
        this.paths = paths;
    }
}