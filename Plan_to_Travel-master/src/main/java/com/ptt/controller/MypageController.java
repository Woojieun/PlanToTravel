package com.ptt.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ptt.model.HistoryVO;
import com.ptt.service.HistoryService;


@Controller
public class MypageController {
	
	private static final Logger logger = LoggerFactory.getLogger(ServeController.class);
	
	@Autowired
	private HistoryService historyservice;
	
	@RequestMapping(value="/getHistory", method = RequestMethod.GET)
	@ResponseBody
	public List<String> getHistory(HttpServletRequest request, Model model) throws Exception {
	    // 사용자 아이디를 세션에서 가져옵니다.
	    HttpSession session = request.getSession();
	    String userId = (String) session.getAttribute("uID_session");
	    System.out.println(userId);
	    
	    // HistoryService를 사용하여 스케줄 데이터를 가져옵니다.
	    HistoryVO history = new HistoryVO();
	    history.setuID(userId);

	    // HistoryService를 호출하여 스케줄을 가져오고 결과를 모델에 추가합니다.
	    List<HistoryVO> userHistory = historyservice.selectHistory(history);

	    
	 // HistoryVO에서 Travel_TITLE 필드만 추출하여 문자열 목록을 생성
	    List<String> historyTitles = userHistory.stream().map(HistoryVO::getTravel_TITLE).collect(Collectors.toList());
	    
	    return historyTitles;
	}

}


/*
public ResponseEntity<String> getHistory() {
	System.out.println("getHistory!");
	logger.info("로그 출력");
	
	//성공 응답 변환
	return ResponseEntity.ok("ok");
}
*/