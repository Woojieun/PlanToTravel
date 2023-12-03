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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;

import com.ptt.model.EventVO;
import com.ptt.model.FavoriteVO;
import com.ptt.model.ScheduleVO;
import com.ptt.service.FavoriteService;
import com.ptt.service.ScheduleService;


@Controller
public class MypageController {
	
	private static final Logger logger = LoggerFactory.getLogger(ServeController.class);
	
	@Autowired
	private ScheduleService scheduleservice;
	
    @Autowired
    private FavoriteService favoriteService;
	
	@RequestMapping(value="/getHistory", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, String>> getHistory(HttpServletRequest request, Model model) throws Exception {
        // 사용자 아이디를 세션에서 가져옵니다.
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("uID_session");
        System.out.println(userId);
        
        // HistoryService를 사용하여 스케줄 데이터를 가져옵니다.
        ScheduleVO history = new ScheduleVO();
        history.setU_id(userId);

        // HistoryService를 호출하여 스케줄을 가져옵니다.
        List<ScheduleVO> userHistory = scheduleservice.selectHistory(history);
        //System.out.println(userHistory);

        // 결과를 가공하여 반환할 리스트 생성
        List<Map<String, String>> historyList = new ArrayList<>();
        for (ScheduleVO item : userHistory) {
            Map<String, String> historyMap = new HashMap<>();
            //아래줄에 ( ) 부분 공백 들어가면 js에 data 값이 undefined로 나옴
            historyMap.put("sche_title", item.getSche_title());
            historyMap.put("sche_id", item.getSche_id());
            historyList.add(historyMap);
            //System.out.println("History List : " + historyList);
        }
        
        return historyList;
    }
	
	//클릭한 히스토리의 스케줄 표 표시
	@RequestMapping(value = "/historySche", method = RequestMethod.GET)
	public ResponseEntity<List<Map<String, String>>> historyScheGET(@RequestParam("buttonValue") String buttonValue, Model model) throws Exception {
		
	    logger.info("히스토리의 스케줄 불러오기");
	    logger.info("클릭한 history의 value: " + buttonValue);
	    
        // 클릭한 history의 value를 사용하여 스케줄 정보를 가져옴
        List<EventVO> scheduleList = scheduleservice.getSchedule(buttonValue);
        //System.out.println("스케줄 리스트 :" + scheduleList);

        // 모델에 결과를 추가하여 뷰로 전달
        //model.addAttribute("scheduleList", scheduleList);

        // 결과를 표시할 뷰의 이름을 반환
        //return "main"; // yourViewName은 실제로 사용하는 뷰의 이름으로 수정해야 합니다.
        
        // 결과를 가공하여 반환할 리스트 생성
        List<Map<String, String>> scheINFO = new ArrayList<>();
        for (EventVO event : scheduleList) {
            Map<String, String> eventMap = new HashMap<>();
            eventMap.put("event_id", String.valueOf(event.getEvent_id()));
            eventMap.put("sche_id", String.valueOf(event.getSche_id()));
            eventMap.put("event_num", String.valueOf(event.getEvent_num()));
            eventMap.put("event_title", event.getEvent_title());
            eventMap.put("event_datetime", String.valueOf(event.getEvent_datetime()));
            scheINFO.add(eventMap);
            //System.out.println("스케줄 정보 :" + scheINFO);
        }

        // ResponseEntity를 사용하여 JSON 형식으로 응답
        return new ResponseEntity<>(scheINFO, HttpStatus.OK);
    }
	
	// 히스토리 삭제 (스케줄 삭제)
	@RequestMapping(value="/hisDelete", method = RequestMethod.GET)
	public ResponseEntity<String> deleteHistory(@RequestParam("sche_id") String sche_id) {
	    try {
	        scheduleservice.deleteSchedule(sche_id);
	        return ResponseEntity.ok("스케줄을 성공적으로 삭제하였습니다.");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Failed to delete schedule: " + e.getMessage());
	    }
	}
	
    //로그아웃
    @RequestMapping(value="/logout", method=RequestMethod.GET)
    public String logoutMainGET(HttpServletRequest request) throws Exception{

        
        logger.info("logoutMainGET메서드 진입");
        
        HttpSession session = request.getSession();
        session.invalidate();
        
        return "redirect:/Login";
    }

    //즐겨찾기 저장
    @RequestMapping(value="/favoriteAdd", method=RequestMethod.POST)
    @ResponseBody
    public String addFavoriteGET(
    		
    		HttpServletRequest request,
            @RequestParam("fav_name") String fav_name,
            @RequestParam("fav_lat") String fav_lat,
            @RequestParam("fav_lng") String fav_lng,
            @RequestParam("fav_address") String fav_address,
            @RequestParam("fav_info") String fav_info) throws Exception {

        logger.info("addFavoriteGET 메서드 진입");
        
        // 사용자 아이디를 세션에서 가져옵니다.
        HttpSession session = request.getSession();
        String u_id = (String) session.getAttribute("uID_session");
        System.out.println(u_id);
        
        FavoriteVO favoriteVO = new FavoriteVO();
        favoriteVO.setU_id(u_id);
        favoriteVO.setFav_name(fav_name);
        favoriteVO.setFav_lat(fav_lat);
        favoriteVO.setFav_lng(fav_lng);
        favoriteVO.setFav_address(fav_address);
        favoriteVO.setFav_info(fav_info);

        favoriteService.addFavorite(favoriteVO);
        
        
        return "Success";
    }
    
    @RequestMapping(value="/getFavorite", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, String>> getFavorite(HttpServletRequest request, Model model) throws Exception {
        // 사용자 아이디를 세션에서 가져옵니다.
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("uID_session");
        System.out.println(userId);
        
        // HistoryService를 사용하여 스케줄 데이터를 가져옵니다.
        FavoriteVO favorite = new FavoriteVO();
        favorite.setU_id(userId);

        // HistoryService를 호출하여 스케줄을 가져옵니다.
        List<FavoriteVO> userFavorite = favoriteService.selectFavorite(favorite);
        //System.out.println(userHistory);

        // 결과를 가공하여 반환할 리스트 생성
        List<Map<String, String>> favoriteList = new ArrayList<>();
        for (FavoriteVO item : userFavorite) {
            Map<String, String> favoriteMap = new HashMap<>();
            //아래줄에 ( ) 부분 공백 들어가면 js에 data 값이 undefined로 나옴
            favoriteMap.put("fav_name", item.getFav_name());
            favoriteMap.put("fav_id", item.getFav_id());
            favoriteList.add(favoriteMap);
            //System.out.println("History List : " + historyList);
        }
        
        return favoriteList;
    }
    
	//즐겨찾기 삭제
	@RequestMapping(value="/favDelete", method = RequestMethod.GET)
	public ResponseEntity<String> deleteFav(@RequestParam("fav_id") String fav_id) {
	    try {
	    	favoriteService.deleteFav(fav_id);
	        return ResponseEntity.ok("즐겨찾기를 성공적으로 삭제하였습니다.");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Failed to delete favorite: " + e.getMessage());
	    }
	}
	
	//즐겨찾기 전체 삭제
	@RequestMapping(value="/deleteAll")
    @ResponseBody
    public ResponseEntity<String> deleteAllFavorites(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String u_id = (String) session.getAttribute("uID_session");

        // Check if the userId is not null to avoid potential issues
        if (u_id != null) {
            // Call the service to delete all favorites for the user
            favoriteService.deleteAllFav(u_id);
            return new ResponseEntity<>("Favorites deleted successfully", HttpStatus.OK);
        }

        // Return an error response if needed
        return new ResponseEntity<>("Unable to delete favorites", HttpStatus.BAD_REQUEST);
    }
}