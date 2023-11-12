package com.ptt.service;

import java.util.List;
import java.util.Map;

import com.ptt.model.LocationVO;
import com.ptt.model.UserVO;

public interface UserService {

	//회원가입
	public void userJoin(UserVO user) throws Exception;
	
	// 아이디 중복 검사
	public int idCheck(String uID) throws Exception;
	
    /* 로그인 */
    public UserVO userLogin(UserVO user) throws Exception;
    
//  유저 데이터
	public UserVO user_data(String uID_session) throws Exception;
} 