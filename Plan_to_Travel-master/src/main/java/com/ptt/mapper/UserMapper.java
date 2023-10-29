package com.ptt.mapper;

import com.ptt.model.UserVO;

public interface UserMapper {
	
	//회원가입
	//userJoin은 UserMapper.xml에 있는 insert문 id
	//UserVO는 UserVO.java 파일의 UserVO 클래스
	public void userJoin(UserVO user);
	
	// 아이디 중복 검사
	public int idCheck(String uID);
	
    /* 로그인 */
    public UserVO userLogin(UserVO user);
}