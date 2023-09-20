package com.ptt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptt.dao.LocationDAO;


public interface LocationService {
    
	// 아이디 중복 검사
	public boolean idCheck(String location_UUID, String location_ID) throws Exception;
}
