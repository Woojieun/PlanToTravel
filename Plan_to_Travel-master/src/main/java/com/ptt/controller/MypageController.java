package com.ptt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class MypageController {
	
	private static final Logger logger = LoggerFactory.getLogger(ServeController.class);
	
	@RequestMapping(value="/getHistory", method = RequestMethod.GET)
	public ResponseEntity<String> getHistory() {
		System.out.println("getHistory!");
		logger.info("로그 출력");
		
		//성공 응답 변환
		return ResponseEntity.ok("ok");
	}
}
