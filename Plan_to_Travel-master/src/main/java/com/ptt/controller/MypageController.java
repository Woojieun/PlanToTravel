package com.ptt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
    public List<Map<String, String>> getHistory(HttpServletRequest request, Model model) throws Exception {
        // 사용자 아이디를 세션에서 가져옵니다.
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("uID_session");
        System.out.println(userId);
        
        // HistoryService를 사용하여 스케줄 데이터를 가져옵니다.
        HistoryVO history = new HistoryVO();
        history.setuID(userId);

        // HistoryService를 호출하여 스케줄을 가져옵니다.
        List<HistoryVO> userHistory = historyservice.selectHistory(history);
        System.out.println(userHistory);

        // 결과를 가공하여 반환할 리스트 생성
        List<Map<String, String>> historyList = new ArrayList<>();
        for (HistoryVO item : userHistory) {
            Map<String, String> historyMap = new HashMap<>();
            historyMap.put("travel_TITLE", item.getTravel_TITLE());
            historyMap.put("schedule_UUID", item.getSchedule_UUID());
            historyList.add(historyMap);
            System.out.println("History List : " + historyList);
        }
        
        return historyList;
    }
	
	//클릭한 히스토리의 스케줄 표 표시
	@RequestMapping(value = "/historySche", method = RequestMethod.GET)
	public void historyScheGET(@RequestParam("buttonValue") String buttonValue) {
		
	    logger.info("히스토리의 스케줄 불러오기");
	    logger.info("클릭한 history의 value: " + buttonValue);
	}

}