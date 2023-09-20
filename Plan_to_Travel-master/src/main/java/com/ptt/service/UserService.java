package com.ptt.service;

import com.ptt.model.UserVO;

public interface UserService {

	//회원가입
	public void userJoin(UserVO user) throws Exception;
	
	// 아이디 중복 검사
	public int idCheck(String uID) throws Exception;
	
    /* 로그인 */
    public UserVO userLogin(UserVO user) throws Exception;
} 