package com.ptt.controller;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ptt.dao.LocationDAO;
import com.ptt.dao.ScheduleDAO;
import com.ptt.model.LocationVO;
import com.ptt.model.ScheduleVO;
import com.ptt.model.UserVO;
import com.ptt.service.LocationService;
import com.ptt.service.UserService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger log = LoggerFactory.getLogger(ServeController.class);

	@Autowired
	private LocationDAO dao;

	@Autowired
	private ScheduleDAO scheduldao;
	
	@Autowired
	private LocationService locationservice;

	@RequestMapping(value = "/Plan_to_travel", method = RequestMethod.GET)
	public String home(HttpSession session, HttpServletRequest req, Model model) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// ajax를 통해 넘어온 배열 데이터 선언
		String[] arrStr = req.getParameterValues("arrStr");
		try {
			if (arrStr != null && arrStr.length > 0) {
				for (int i = 0; i < arrStr.length; i++) {
					System.out.println("ajax traditional result : " + i + " : " + arrStr[i]);
				}

				resultMap.put("result", "success");

			} else {
				resultMap.put("result", "false");

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "main";
	}

	@ResponseBody
	@RequestMapping(value = "/Plan_to_travel", method = RequestMethod.POST)
	public void home_location(HttpSession session, HttpServletRequest req, LocationVO locationvo,
			@RequestParam(value = "location_uuid", required = false) String location_uuid) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// ajax를 통해 넘어온 배열 데이터 선언
		String[] arrStr = req.getParameterValues("arrStr");
		String[] schedule_arrStr = req.getParameterValues("schdule_itemList");
		String[] schedule_arrStr2 = req.getParameterValues("schdule_itemList2");
		// 로그인 성공한 아이디(세션값) 가져오기
		String uID_session = (String) session.getAttribute("uID_session");
		System.out.println("ajax traditional result : " + arrStr[0]);
		try {
			if (arrStr != null && arrStr.length > 0) {
				for (int i = 0; i < arrStr.length; i++) {
					System.out.println("ajax traditional result : " + i + " : " + arrStr[i]);
				}
		
				LocationVO vo = new LocationVO();
				vo.setLocation_UUID(location_uuid);
				vo.setuID(uID_session);
				vo.setLocation_ID(arrStr[0]);
				vo.setLocation_TITLE(arrStr[1]);
				vo.setLocation_DATE(arrStr[2]);
				vo.setLocation_TIME(arrStr[3]);
				vo.setLocation_NAME(arrStr[4]);
				vo.setLocation_LAT(arrStr[5]);
				vo.setLocation_LNG(arrStr[6]);
				vo.setLocation_MEMO(arrStr[7]);
				vo.setLocation_REVIEW(arrStr[8]);

				dao.insertMember(vo);
				resultMap.put("result", "success");
			} else {

				resultMap.put("result", "false");
			}
			
			
			
			if (schedule_arrStr != null && schedule_arrStr.length > 0) {
				for (int a = 0; a < schedule_arrStr.length; a++) {
					if(a < schedule_arrStr.length) {
					System.out.println("ajax traditional schedule_arrStr : " + a + " : " + schedule_arrStr[a]);
					} else {
					schedule_arrStr[a] = "";
					}
				}
				
				ScheduleVO schedulevo = new ScheduleVO();
				schedulevo.setSchedule_UUID(location_uuid);
				schedulevo.setuID(uID_session);
				schedulevo.setSchedule_ID1(schedule_arrStr[0]);
				schedulevo.setSchedule_TITLE1(schedule_arrStr[1]);
				schedulevo.setSchedule_ID2(schedule_arrStr[2]);
				schedulevo.setSchedule_TITLE2(schedule_arrStr[3]);
				schedulevo.setSchedule_ID3(schedule_arrStr[4]);
				schedulevo.setSchedule_TITLE3(schedule_arrStr[5]);
				schedulevo.setSchedule_ID4(schedule_arrStr[6]);
				schedulevo.setSchedule_TITLE4(schedule_arrStr[7]);
				schedulevo.setSchedule_ID5(schedule_arrStr[8]);
				schedulevo.setSchedule_TITLE5(schedule_arrStr[9]);
				schedulevo.setSchedule_ID6(schedule_arrStr[10]);
				schedulevo.setSchedule_TITLE6(schedule_arrStr[11]);
				schedulevo.setSchedule_ID7(schedule_arrStr[12]);
				schedulevo.setSchedule_TITLE7(schedule_arrStr[13]);
				schedulevo.setSchedule_ID8(schedule_arrStr[14]);
				schedulevo.setSchedule_TITLE8(schedule_arrStr[15]);
				schedulevo.setSchedule_ID9(schedule_arrStr[16]);
				schedulevo.setSchedule_TITLE9(schedule_arrStr[17]);
				schedulevo.setSchedule_ID10(schedule_arrStr[18]);
				schedulevo.setSchedule_TITLE10(schedule_arrStr[19]);
				schedulevo.setSchedule_ID11(schedule_arrStr[20]);
				schedulevo.setSchedule_TITLE11(schedule_arrStr[21]);
				schedulevo.setSchedule_ID12(schedule_arrStr[22]);
				schedulevo.setSchedule_TITLE12(schedule_arrStr[23]);

				scheduldao.insertSchedule(schedulevo);
			}
			
			if (schedule_arrStr2 != null && schedule_arrStr2.length > 0) {
				for (int a = 0; a < schedule_arrStr2.length; a++) {
					if(a < schedule_arrStr2.length) {
					System.out.println("ajax traditional schedule_arrStr2 : " + a + " : " + schedule_arrStr2[a]);
					} else {
					schedule_arrStr2[a] = "";
					}
				}
				
				ScheduleVO schedulevo = new ScheduleVO();
				schedulevo.setSchedule_UUID(location_uuid);
				schedulevo.setuID(uID_session);
				schedulevo.setSchedule_ID1(schedule_arrStr2[0]);
				schedulevo.setSchedule_TITLE1(schedule_arrStr2[1]);
				schedulevo.setSchedule_ID2(schedule_arrStr2[2]);
				schedulevo.setSchedule_TITLE2(schedule_arrStr2[3]);
				schedulevo.setSchedule_ID3(schedule_arrStr2[4]);
				schedulevo.setSchedule_TITLE3(schedule_arrStr2[5]);
				schedulevo.setSchedule_ID4(schedule_arrStr2[6]);
				schedulevo.setSchedule_TITLE4(schedule_arrStr2[7]);
				schedulevo.setSchedule_ID5(schedule_arrStr2[8]);
				schedulevo.setSchedule_TITLE5(schedule_arrStr2[9]);
				schedulevo.setSchedule_ID6(schedule_arrStr2[10]);
				schedulevo.setSchedule_TITLE6(schedule_arrStr2[11]);
				schedulevo.setSchedule_ID7(schedule_arrStr2[12]);
				schedulevo.setSchedule_TITLE7(schedule_arrStr2[13]);
				schedulevo.setSchedule_ID8(schedule_arrStr2[14]);
				schedulevo.setSchedule_TITLE8(schedule_arrStr2[15]);
				schedulevo.setSchedule_ID9(schedule_arrStr2[16]);
				schedulevo.setSchedule_TITLE9(schedule_arrStr2[17]);
				schedulevo.setSchedule_ID10(schedule_arrStr2[18]);
				schedulevo.setSchedule_TITLE10(schedule_arrStr2[19]);
				schedulevo.setSchedule_ID11(schedule_arrStr2[20]);
				schedulevo.setSchedule_TITLE11(schedule_arrStr2[21]);
				schedulevo.setSchedule_ID12(schedule_arrStr2[22]);
				schedulevo.setSchedule_TITLE12(schedule_arrStr2[23]);

				scheduldao.insertSchedule(schedulevo);
			}else {
				resultMap.put("result", "false");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	// 아이디 중복 검사
		@RequestMapping(value = "/IdChk", method = RequestMethod.POST)
		@ResponseBody
		public String userIdChkPOST(String location_UUID, String location_ID, HttpSession session) throws Exception{
			
			log.info("userIdChk() 진입");
			
			session.getAttribute("location_ID");
			
			boolean result = locationservice.idCheck(location_UUID, location_ID);
			
			System.out.println("결과값 uuid = " + result);
			
			if(result) {
				return "success";	// 중복 데이터 없음
				
			} else {

				return "fail";	// 중복 데이터 존재
				
			}	
			
		} // memberIdChkPOST() 종료
}