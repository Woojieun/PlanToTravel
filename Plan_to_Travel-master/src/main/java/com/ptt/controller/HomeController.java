package com.ptt.controller;

import java.util.HashMap;
import java.util.List;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ptt.dao.LocationDAO;
import com.ptt.dao.ScheduleDAO;
import com.ptt.mapper.LocationMapper;
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

	@Autowired
	LocationMapper mapper;

	@RequestMapping(value = "/Plan_to_travel", method = RequestMethod.GET, produces = "application/json")
	public String home(HttpSession session, HttpServletRequest req, Model model,
	                   @RequestParam(value = "location_UUID", required = false) String location_UUID,
	                   @RequestParam(value = "location_ID", required = false) String location_ID) throws Exception {

	    return "main"; // JSP 페이지를 렌더링
	}
	 

	@ResponseBody
	@RequestMapping(value = "/Plan_to_travel", method = RequestMethod.POST, produces = "application/json")
	public Map<String, Object> home_location(HttpSession session, HttpServletRequest req, LocationVO locationvo,
			@RequestParam(value = "location_UUID", required = false) String location_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID,
			@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "location_ID", required = false) String location_ID, Model model) throws Exception {
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
					System.out.println("Plan_to_travel : " + i + " : " + arrStr[i]);
				}

				LocationVO vo = new LocationVO();
				vo.setLocation_UUID(location_UUID);
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
					if (a < schedule_arrStr.length) {
						System.out.println("ajax traditional schedule_arrStr : " + a + " : " + schedule_arrStr[a]);
					} else {
						schedule_arrStr[a] = "";
					}
				}

				ScheduleVO schedulevo = new ScheduleVO();
				schedulevo.setSchedule_UUID(location_UUID);
				schedulevo.setuID(uID_session);
				schedulevo.setSchedule_ID(schedule_arrStr[0]);
				schedulevo.setTravel_TITLE(schedule_arrStr[1]);
				schedulevo.setSchedule_ID1(schedule_arrStr[2]);
				schedulevo.setSchedule_TITLE1(schedule_arrStr[3]);
				schedulevo.setSchedule_ID2(schedule_arrStr[4]);
				schedulevo.setSchedule_TITLE2(schedule_arrStr[5]);
				schedulevo.setSchedule_ID3(schedule_arrStr[6]);
				schedulevo.setSchedule_TITLE3(schedule_arrStr[7]);
				schedulevo.setSchedule_ID4(schedule_arrStr[8]);
				schedulevo.setSchedule_TITLE4(schedule_arrStr[9]);
				schedulevo.setSchedule_ID5(schedule_arrStr[10]);
				schedulevo.setSchedule_TITLE5(schedule_arrStr[11]);
				schedulevo.setSchedule_ID6(schedule_arrStr[12]);
				schedulevo.setSchedule_TITLE6(schedule_arrStr[13]);
				schedulevo.setSchedule_ID7(schedule_arrStr[14]);
				schedulevo.setSchedule_TITLE7(schedule_arrStr[15]);
				schedulevo.setSchedule_ID8(schedule_arrStr[16]);
				schedulevo.setSchedule_TITLE8(schedule_arrStr[17]);
				schedulevo.setSchedule_ID9(schedule_arrStr[18]);
				schedulevo.setSchedule_TITLE9(schedule_arrStr[19]);
				schedulevo.setSchedule_ID10(schedule_arrStr[20]);
				schedulevo.setSchedule_TITLE10(schedule_arrStr[21]);
				schedulevo.setSchedule_ID11(schedule_arrStr[22]);
				schedulevo.setSchedule_TITLE11(schedule_arrStr[23]);
				schedulevo.setSchedule_ID12(schedule_arrStr[24]);
				schedulevo.setSchedule_TITLE12(schedule_arrStr[25]);

				scheduldao.insertSchedule(schedulevo);
			}

			if (schedule_arrStr2 != null && schedule_arrStr2.length > 0) {
				for (int a = 0; a < schedule_arrStr2.length; a++) {
					if (a < schedule_arrStr2.length) {
						System.out.println("ajax traditional schedule_arrStr2 : " + a + " : " + schedule_arrStr2[a]);
					} else {
						schedule_arrStr2[a] = "";
					}
				}

				ScheduleVO schedulevo = new ScheduleVO();
				schedulevo.setSchedule_UUID(location_UUID);
				schedulevo.setuID(uID_session);
				schedulevo.setSchedule_ID(schedule_arrStr2[0]);
				schedulevo.setTravel_TITLE(schedule_arrStr2[1]);
				schedulevo.setSchedule_ID1(schedule_arrStr2[2]);
				schedulevo.setSchedule_TITLE1(schedule_arrStr2[3]);
				schedulevo.setSchedule_ID2(schedule_arrStr2[4]);
				schedulevo.setSchedule_TITLE2(schedule_arrStr2[5]);
				schedulevo.setSchedule_ID3(schedule_arrStr2[6]);
				schedulevo.setSchedule_TITLE3(schedule_arrStr2[7]);
				schedulevo.setSchedule_ID4(schedule_arrStr2[8]);
				schedulevo.setSchedule_TITLE4(schedule_arrStr2[9]);
				schedulevo.setSchedule_ID5(schedule_arrStr2[10]);
				schedulevo.setSchedule_TITLE5(schedule_arrStr2[11]);
				schedulevo.setSchedule_ID6(schedule_arrStr2[12]);
				schedulevo.setSchedule_TITLE6(schedule_arrStr2[13]);
				schedulevo.setSchedule_ID7(schedule_arrStr2[14]);
				schedulevo.setSchedule_TITLE7(schedule_arrStr2[15]);
				schedulevo.setSchedule_ID8(schedule_arrStr2[16]);
				schedulevo.setSchedule_TITLE8(schedule_arrStr2[17]);
				schedulevo.setSchedule_ID9(schedule_arrStr2[18]);
				schedulevo.setSchedule_TITLE9(schedule_arrStr2[19]);
				schedulevo.setSchedule_ID10(schedule_arrStr2[20]);
				schedulevo.setSchedule_TITLE10(schedule_arrStr2[21]);
				schedulevo.setSchedule_ID11(schedule_arrStr2[22]);
				schedulevo.setSchedule_TITLE11(schedule_arrStr2[23]);
				schedulevo.setSchedule_ID12(schedule_arrStr2[24]);
				schedulevo.setSchedule_TITLE12(schedule_arrStr2[25]);

				scheduldao.insertSchedule(schedulevo);
			} else {
				resultMap.put("result", "false");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	
	
	@ResponseBody
	@RequestMapping(value = "/Plan_to_travel_location", method = RequestMethod.POST, produces = "application/json")
	public Map<String, Object> home_location_insert(HttpSession session, HttpServletRequest req, LocationVO locationvo,
			@RequestParam(value = "location_UUID", required = false) String location_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID,
			@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "location_ID", required = false) String location_ID, Model model) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		// ajax를 통해 넘어온 배열 데이터 선언
		String[] arrStr = req.getParameterValues("arrStr");

		// 로그인 성공한 아이디(세션값) 가져오기
		String uID_session = (String) session.getAttribute("uID_session");

		System.out.println("ajax traditional result : " + arrStr[0]);
		try {
			if (arrStr != null && arrStr.length > 0) {
				for (int i = 0; i < arrStr.length; i++) {
					System.out.println("Plan_to_travel_location : " + i + " : " + arrStr[i]);
				}

				LocationVO vo = new LocationVO();
				vo.setLocation_UUID(location_UUID);
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

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultMap;
	}

	
	
	  // 데이터 출력
	@ResponseBody
	@RequestMapping(value = "/location_print", method = RequestMethod.POST, produces = "application/json")
	public Map<String, Object> location_print(HttpSession session, HttpServletRequest req, LocationVO locationvo,
			@RequestParam(value = "location_UUID", required = false) String location_UUID,
			@RequestParam(value = "location_ID", required = false) String location_ID, Model model) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> map = new HashMap<>();
		map.put("location_UUID", location_UUID);
		map.put("location_ID", location_ID);
		  
		  List<LocationVO> location_map = locationservice.Location_print(map);
		  
		  System.out.println("location_print" + location_map);
		  
		  model.addAttribute("message", "Hello Everyone"); 
		  model.addAttribute("data", location_map); 
 
		resultMap.put("data2", location_map);
		
		return resultMap;
	}
	 
	 

	// 수정하기
	@ResponseBody
	@RequestMapping(value = "/change", method = RequestMethod.POST, produces = "application/json")
	public Map<String, Object> changePOST(HttpSession session, HttpServletRequest req, ScheduleVO schedulevo,
			@RequestParam(value = "location_UUID", required = false) String location_UUID,
			@RequestParam(value = "location_ID", required = false) String location_ID, LocationVO location_VO,
			@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID,
			@RequestParam(value = "result", required = false) String result) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// ajax를 통해 넘어온 배열 데이터 선언
		String[] arrStr = req.getParameterValues("arrStr");
		String[] schedule_arrStr = req.getParameterValues("schdule_itemList");
		String[] schedule_arrStr2 = req.getParameterValues("schdule_itemList2");
		
		try {
			if (arrStr != null && arrStr.length > 0) {
				for (int i = 0; i < arrStr.length; i++) {
					System.out.println("ajax change : " + i + " : " + arrStr[i]);
				}

				location_VO.setLocation_TITLE(arrStr[1]);
				location_VO.setLocation_DATE(arrStr[2]);
				location_VO.setLocation_TIME(arrStr[3]);
				location_VO.setLocation_NAME(arrStr[4]);
				location_VO.setLocation_LAT(arrStr[5]);
				location_VO.setLocation_LNG(arrStr[6]);
				location_VO.setLocation_MEMO(arrStr[7]);
				location_VO.setLocation_REVIEW(arrStr[8]);

				dao.change(location_VO);
			}

			if (schedule_arrStr != null && schedule_arrStr.length > 0) {
				for (int a = 0; a < schedule_arrStr.length; a++) {
					if (a < schedule_arrStr.length) {
						System.out.println("ajax change schedule_arrStr : " + a + " : " + schedule_arrStr[a]);
					} else {
						schedule_arrStr[a] = "";
					}
				}

				schedulevo.setTravel_TITLE(schedule_arrStr[1]);
				schedulevo.setSchedule_ID1(schedule_arrStr[2]);
				schedulevo.setSchedule_TITLE1(schedule_arrStr[3]);
				schedulevo.setSchedule_ID2(schedule_arrStr[4]);
				schedulevo.setSchedule_TITLE2(schedule_arrStr[5]);
				schedulevo.setSchedule_ID3(schedule_arrStr[6]);
				schedulevo.setSchedule_TITLE3(schedule_arrStr[7]);
				schedulevo.setSchedule_ID4(schedule_arrStr[8]);
				schedulevo.setSchedule_TITLE4(schedule_arrStr[9]);
				schedulevo.setSchedule_ID5(schedule_arrStr[10]);
				schedulevo.setSchedule_TITLE5(schedule_arrStr[11]);
				schedulevo.setSchedule_ID6(schedule_arrStr[12]);
				schedulevo.setSchedule_TITLE6(schedule_arrStr[13]);
				schedulevo.setSchedule_ID7(schedule_arrStr[14]);
				schedulevo.setSchedule_TITLE7(schedule_arrStr[15]);
				schedulevo.setSchedule_ID8(schedule_arrStr[16]);
				schedulevo.setSchedule_TITLE8(schedule_arrStr[17]);
				schedulevo.setSchedule_ID9(schedule_arrStr[18]);
				schedulevo.setSchedule_TITLE9(schedule_arrStr[19]);
				schedulevo.setSchedule_ID10(schedule_arrStr[20]);
				schedulevo.setSchedule_TITLE10(schedule_arrStr[21]);
				schedulevo.setSchedule_ID11(schedule_arrStr[22]);
				schedulevo.setSchedule_TITLE11(schedule_arrStr[23]);
				schedulevo.setSchedule_ID12(schedule_arrStr[24]);
				schedulevo.setSchedule_TITLE12(schedule_arrStr[25]);

				scheduldao.changeSchedule(schedulevo);
			}

			if (schedule_arrStr2 != null && schedule_arrStr2.length > 0) {
				for (int a = 0; a < schedule_arrStr2.length; a++) {
					if (a < schedule_arrStr2.length) {
						System.out.println("ajax change schedule_arrStr2 : " + a + " : " + schedule_arrStr2[a]);
					} else {
						schedule_arrStr2[a] = "";
					}
				}

				schedulevo.setTravel_TITLE(schedule_arrStr2[1]);
				schedulevo.setSchedule_ID1(schedule_arrStr2[2]);
				schedulevo.setSchedule_TITLE1(schedule_arrStr2[3]);
				schedulevo.setSchedule_ID2(schedule_arrStr2[4]);
				schedulevo.setSchedule_TITLE2(schedule_arrStr2[5]);
				schedulevo.setSchedule_ID3(schedule_arrStr2[6]);
				schedulevo.setSchedule_TITLE3(schedule_arrStr2[7]);
				schedulevo.setSchedule_ID4(schedule_arrStr2[8]);
				schedulevo.setSchedule_TITLE4(schedule_arrStr2[9]);
				schedulevo.setSchedule_ID5(schedule_arrStr2[10]);
				schedulevo.setSchedule_TITLE5(schedule_arrStr2[11]);
				schedulevo.setSchedule_ID6(schedule_arrStr2[12]);
				schedulevo.setSchedule_TITLE6(schedule_arrStr2[13]);
				schedulevo.setSchedule_ID7(schedule_arrStr2[14]);
				schedulevo.setSchedule_TITLE7(schedule_arrStr2[15]);
				schedulevo.setSchedule_ID8(schedule_arrStr2[16]);
				schedulevo.setSchedule_TITLE8(schedule_arrStr2[17]);
				schedulevo.setSchedule_ID9(schedule_arrStr2[18]);
				schedulevo.setSchedule_TITLE9(schedule_arrStr2[19]);
				schedulevo.setSchedule_ID10(schedule_arrStr2[20]);
				schedulevo.setSchedule_TITLE10(schedule_arrStr2[21]);
				schedulevo.setSchedule_ID11(schedule_arrStr2[22]);
				schedulevo.setSchedule_TITLE11(schedule_arrStr2[23]);
				schedulevo.setSchedule_ID12(schedule_arrStr2[24]);
				schedulevo.setSchedule_TITLE12(schedule_arrStr2[25]);

				scheduldao.changeSchedule(schedulevo);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} // memberIdChkPOST() 종료
		return resultMap;
	}
	
	
	// 스케줄 수정하기
		@ResponseBody
		@RequestMapping(value = "/schedule_change", method = RequestMethod.POST, produces = "application/json")
		public Map<String, Object> schedule_changePOST(HttpSession session, HttpServletRequest req, ScheduleVO schedulevo,
				@RequestParam(value = "location_UUID", required = false) String location_UUID,
				@RequestParam(value = "location_ID", required = false) String location_ID, LocationVO location_VO,
				@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
				@RequestParam(value = "schedule_ID", required = false) String schedule_ID,
				@RequestParam(value = "result", required = false) String result) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// ajax를 통해 넘어온 배열 데이터 선언
		String[] arrStr = req.getParameterValues("arrStr");
		String[] schedule_arrStr = req.getParameterValues("schdule_itemList");
		String[] schedule_arrStr2 = req.getParameterValues("schdule_itemList2");
		// 로그인 성공한 아이디(세션값) 가져오기
		String uID_session = (String) session.getAttribute("uID_session");
		try {
			if (arrStr != null && arrStr.length > 0) {
				for (int i = 0; i < arrStr.length; i++) {
					System.out.println("schedule_change result : " + i + " : " + arrStr[i]);
				}

				LocationVO vo = new LocationVO();
				vo.setLocation_UUID(location_UUID);
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
						if (a < schedule_arrStr.length) {
							System.out.println("ajax change schedule_arrStr : " + a + " : " + schedule_arrStr[a]);
						} else {
							schedule_arrStr[a] = "";
						}
					}

					schedulevo.setTravel_TITLE(schedule_arrStr[1]);
					schedulevo.setSchedule_ID1(schedule_arrStr[2]);
					schedulevo.setSchedule_TITLE1(schedule_arrStr[3]);
					schedulevo.setSchedule_ID2(schedule_arrStr[4]);
					schedulevo.setSchedule_TITLE2(schedule_arrStr[5]);
					schedulevo.setSchedule_ID3(schedule_arrStr[6]);
					schedulevo.setSchedule_TITLE3(schedule_arrStr[7]);
					schedulevo.setSchedule_ID4(schedule_arrStr[8]);
					schedulevo.setSchedule_TITLE4(schedule_arrStr[9]);
					schedulevo.setSchedule_ID5(schedule_arrStr[10]);
					schedulevo.setSchedule_TITLE5(schedule_arrStr[11]);
					schedulevo.setSchedule_ID6(schedule_arrStr[12]);
					schedulevo.setSchedule_TITLE6(schedule_arrStr[13]);
					schedulevo.setSchedule_ID7(schedule_arrStr[14]);
					schedulevo.setSchedule_TITLE7(schedule_arrStr[15]);
					schedulevo.setSchedule_ID8(schedule_arrStr[16]);
					schedulevo.setSchedule_TITLE8(schedule_arrStr[17]);
					schedulevo.setSchedule_ID9(schedule_arrStr[18]);
					schedulevo.setSchedule_TITLE9(schedule_arrStr[19]);
					schedulevo.setSchedule_ID10(schedule_arrStr[20]);
					schedulevo.setSchedule_TITLE10(schedule_arrStr[21]);
					schedulevo.setSchedule_ID11(schedule_arrStr[22]);
					schedulevo.setSchedule_TITLE11(schedule_arrStr[23]);
					schedulevo.setSchedule_ID12(schedule_arrStr[24]);
					schedulevo.setSchedule_TITLE12(schedule_arrStr[25]);

					scheduldao.changeSchedule(schedulevo);
				}

				if (schedule_arrStr2 != null && schedule_arrStr2.length > 0) {
					for (int a = 0; a < schedule_arrStr2.length; a++) {
						if (a < schedule_arrStr2.length) {
							System.out.println("ajax change schedule_arrStr2 : " + a + " : " + schedule_arrStr2[a]);
						} else {
							schedule_arrStr2[a] = "";
						}
					}

					schedulevo.setTravel_TITLE(schedule_arrStr2[1]);
					schedulevo.setSchedule_ID1(schedule_arrStr2[2]);
					schedulevo.setSchedule_TITLE1(schedule_arrStr2[3]);
					schedulevo.setSchedule_ID2(schedule_arrStr2[4]);
					schedulevo.setSchedule_TITLE2(schedule_arrStr2[5]);
					schedulevo.setSchedule_ID3(schedule_arrStr2[6]);
					schedulevo.setSchedule_TITLE3(schedule_arrStr2[7]);
					schedulevo.setSchedule_ID4(schedule_arrStr2[8]);
					schedulevo.setSchedule_TITLE4(schedule_arrStr2[9]);
					schedulevo.setSchedule_ID5(schedule_arrStr2[10]);
					schedulevo.setSchedule_TITLE5(schedule_arrStr2[11]);
					schedulevo.setSchedule_ID6(schedule_arrStr2[12]);
					schedulevo.setSchedule_TITLE6(schedule_arrStr2[13]);
					schedulevo.setSchedule_ID7(schedule_arrStr2[14]);
					schedulevo.setSchedule_TITLE7(schedule_arrStr2[15]);
					schedulevo.setSchedule_ID8(schedule_arrStr2[16]);
					schedulevo.setSchedule_TITLE8(schedule_arrStr2[17]);
					schedulevo.setSchedule_ID9(schedule_arrStr2[18]);
					schedulevo.setSchedule_TITLE9(schedule_arrStr2[19]);
					schedulevo.setSchedule_ID10(schedule_arrStr2[20]);
					schedulevo.setSchedule_TITLE10(schedule_arrStr2[21]);
					schedulevo.setSchedule_ID11(schedule_arrStr2[22]);
					schedulevo.setSchedule_TITLE11(schedule_arrStr2[23]);
					schedulevo.setSchedule_ID12(schedule_arrStr2[24]);
					schedulevo.setSchedule_TITLE12(schedule_arrStr2[25]);

					scheduldao.changeSchedule(schedulevo);
				}

			} catch (Exception e) {
				e.printStackTrace();
			} // memberIdChkPOST() 종료
			return resultMap;
		}

	// location_result 삽입 가능 여부
	@RequestMapping(value = "/IdChk", method = RequestMethod.POST)
	@ResponseBody
	public String userIdChkPOST(String location_UUID, String location_ID, String schedule_UUID, String schedule_ID,
			HttpSession session) throws Exception {

		log.info("userIdChk() 진입");

		boolean location_result = locationservice.idCheck(location_UUID, location_ID);

		boolean schedule_result = locationservice.scheduleCheck(schedule_UUID, schedule_ID);

		System.out.println("결과값 IdChk uuid = " + location_result + schedule_result);

		// location_result = uuid와 id가 둘 다 있다면 true 아니면 false
		// schedule_result = uuid와 id가 둘 다 있다면 true 아니면 false
		// 
		if (location_result == true && schedule_result == true) {
			return "success"; // 중복 데이터 없음 추가
		} 
		else if (location_result == true && schedule_result == false) {
			return "successfail";
		}
		else {
			return "fail"; // 중복 데이이터 존재 수정
		}

	} // memberIdChkPOST() 종료
	
	
	// 수정 가능 여부
	@RequestMapping(value = "/modifyChk", method = RequestMethod.POST)
	@ResponseBody
	public String usermodifyChkPOST(String location_UUID, String location_ID, String schedule_UUID, String schedule_ID,
			HttpSession session) throws Exception {

		log.info("usermodifyChkPOST() 진입");

		boolean location_result = locationservice.idmodifyCheck(location_UUID, location_ID);

		boolean schedule_result = locationservice.schedulemodifyCheck(schedule_UUID, schedule_ID);

		System.out.println("결과값 modifyChk uuid = " + location_result + schedule_result);

		// location_result = uuid와 id가 둘 다 있다면 true 아니면 false
		// schedule_result = uuid와 id가 둘 다 있다면 true 아니면 false
		if (location_result == true && schedule_result == true) {
			return "fail_modify"; // 수정 가능
		} 
		else if (location_result == true && schedule_result == false) {
			return "successfail_modify";
		}
		else {
			return "success_modify"; // 수정 실패
		}

	} // memberIdChkPOST() 종료
}