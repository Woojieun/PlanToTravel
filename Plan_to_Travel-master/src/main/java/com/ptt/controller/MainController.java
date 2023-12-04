package com.ptt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller

public class MainController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	//메인 페이지 이동
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String mainPageGET() {
			
		logger.info("main 페이지 진입");
		
		return "Plan_to_travel";
	}

}