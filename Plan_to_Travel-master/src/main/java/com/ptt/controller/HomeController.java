package com.ptt.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptt.dao.LocationDAO;
import com.ptt.dao.ScheduleDAO;
import com.ptt.mapper.LocationMapper;
import com.ptt.model.LocationVO;
import com.ptt.model.ScheduleVO;
import com.ptt.model.UserVO;
import com.ptt.service.LocationService;
import com.ptt.service.ScheduleService;
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
	private ScheduleService scheduleservice;

	@Autowired
	private UserService userservice;

	@Autowired
	LocationMapper mapper;

	@RequestMapping(value = "/Plan_to_travel", method = RequestMethod.GET, produces = "application/json")
	public String home(HttpSession session, HttpServletRequest req, Model model,
			@RequestParam(value = "location_UUID", required = false) String location_UUID,
			@RequestParam(value = "location_ID", required = false) String location_ID) throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> map = new HashMap<>();

		// 로그인 성공한 아이디(세션값) 가져오기
		String uID_session = (String) session.getAttribute("uID_session");

		UserVO location_map = userservice.user_data(uID_session);

		model.addAttribute("user", location_map);

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

		try {
			if (arrStr != null && arrStr.length > 0) {
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
	@RequestMapping(value = "/Plan_to_travel_schedule", method = RequestMethod.POST, produces = "application/json")
	public Map<String, Object> home_schedule(HttpSession session, HttpServletRequest req, LocationVO locationvo,
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

		try {
			if (schedule_arrStr != null && schedule_arrStr.length > 0) {

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

		try {
			if (arrStr != null && arrStr.length > 0) {

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

		try {
			if (arrStr != null && arrStr.length > 0) {

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
			if (schedule_arrStr != null && schedule_arrStr.length > 0) {

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

		// location_result = uuid와 id가 둘 다 있다면 true 아니면 false
		// schedule_result = uuid와 id가 둘 다 있다면 true 아니면 false
		if (location_result == true) {
			return "location_true_modify"; // location 수정
		} else if (location_result == false) {
			return "location_false_modify"; // location 삽입
		} else {
			return "success_modify"; // 수정 실패
		}

	} // memberIdChkPOST() 종료

	// 수정 가능 여부
	@RequestMapping(value = "/modifyChk", method = RequestMethod.POST)
	@ResponseBody
	public String usermodifyChkPOST(@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID,
			@RequestParam(value = "schedule_ID2", required = false) String schedule_ID2, HttpSession session,
			HttpServletRequest req) throws Exception {

		log.info("usermodifyChkPOST() 진입");

		int schedule_result = locationservice.schedulemodifyCheck(schedule_UUID, schedule_ID);

		if (schedule_result == 0) {
			return "schedule_true_modify"; // schedule 수정
		}

		else {
			return "schedule_false_modify"; // schedule 삽입
		}

	} // memberIdChkPOST() 종료

	// 수정 가능 여부
	@RequestMapping(value = "/modifyChk2", method = RequestMethod.POST)
	@ResponseBody
	public String usermodifyChkPOST2(@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID, HttpSession session,
			HttpServletRequest req) throws Exception {

		log.info("usermodifyChkPOST2() 진입");
		int schedule_result_title2 = locationservice.schedulemodifyCheck(schedule_UUID, schedule_ID);

		if (schedule_result_title2 == 0) {
			return "schedule_true_modify2"; // schedule 수정
		}

		else if (schedule_result_title2 > 0) {
			return "schedule_false_modify2"; // schedule 삽입
		} else {
			return "success_modify"; // 수정 실패
		}

	} // memberIdChkPOST() 종료

	// 수정 가능 여부
	@RequestMapping(value = "/modifyChk3", method = RequestMethod.POST)
	@ResponseBody
	public String usermodifyChkPOST3(@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID, HttpSession session,
			HttpServletRequest req) throws Exception {

		log.info("usermodifyChkPOST3() 진입");

		int schedule_result_title3 = locationservice.schedulemodifyCheck(schedule_UUID, schedule_ID);

		if (schedule_result_title3 == 0) {
			return "schedule_true_modify3"; // schedule 수정
		}

		else if (schedule_result_title3 > 0) {
			return "schedule_false_modify3"; // schedule 삽입
		} else {
			return "success_modify"; // 수정 실패
		}

	} // memberIdChkPOST() 종료

	// 수정 가능 여부
	@RequestMapping(value = "/modifyChk4", method = RequestMethod.POST)
	@ResponseBody
	public String usermodifyChkPOST4(@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID, HttpSession session,
			HttpServletRequest req) throws Exception {

		log.info("usermodifyChkPOST4() 진입");

		int schedule_result_title4 = locationservice.schedulemodifyCheck(schedule_UUID, schedule_ID);

		if (schedule_result_title4 == 0) {
			return "schedule_true_modify4"; // schedule 수정
		}

		else if (schedule_result_title4 > 0) {
			return "schedule_false_modify4"; // schedule 삽입
		} else {
			return "success_modify"; // 수정 실패
		}

	} // memberIdChkPOST() 종료

	// 수정 가능 여부
	@RequestMapping(value = "/modifyChk5", method = RequestMethod.POST)
	@ResponseBody
	public String usermodifyChkPOST5(@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID, HttpSession session,
			HttpServletRequest req) throws Exception {

		log.info("usermodifyChkPOST5() 진입");

		int schedule_result_title5 = locationservice.schedulemodifyCheck(schedule_UUID, schedule_ID);

		if (schedule_result_title5 == 0) {
			return "schedule_true_modify5"; // schedule 수정
		}

		else if (schedule_result_title5 > 0) {
			return "schedule_false_modify5"; // schedule 삽입
		} else {
			return "success_modify"; // 수정 실패
		}

	} // memberIdChkPOST() 종료

	// 수정 가능 여부
	@RequestMapping(value = "/modifyChk6", method = RequestMethod.POST)
	@ResponseBody
	public String usermodifyChkPOST6(@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID, HttpSession session,
			HttpServletRequest req) throws Exception {

		log.info("usermodifyChkPOST6() 진입");

		int schedule_result_title6 = locationservice.schedulemodifyCheck(schedule_UUID, schedule_ID);

		if (schedule_result_title6 == 0) {
			return "schedule_true_modify6"; // schedule 수정
		}

		else if (schedule_result_title6 > 0) {
			return "schedule_false_modify6"; // schedule 삽입
		} else {
			return "success_modify"; // 수정 실패
		}

	} // memberIdChkPOST() 종료

	// 수정 가능 여부
	@RequestMapping(value = "/modifyChk7", method = RequestMethod.POST)
	@ResponseBody
	public String usermodifyChkPOST7(@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID, HttpSession session,
			HttpServletRequest req) throws Exception {

		log.info("usermodifyChkPOST7() 진입");

		int schedule_result_title7 = locationservice.schedulemodifyCheck(schedule_UUID, schedule_ID);

		if (schedule_result_title7 == 0) {
			return "schedule_true_modify7"; // schedule 수정
		}

		else if (schedule_result_title7 > 0) {
			return "schedule_false_modify7"; // schedule 삽입
		} else {
			return "success_modify"; // 수정 실패
		}

	} // memberIdChkPOST() 종료

	@RequestMapping(value = "/handleMapData", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Double> handleMapData(@RequestParam Double latitude, @RequestParam Double longitude) {
		Map<String, Double> response = new HashMap<>();
		// 경도 위도 데이터
		response.put("latitude", latitude);
		response.put("longitude", longitude);
		return response;
	}

	@RequestMapping(value = "/Schedule_print", method = RequestMethod.POST)
	@ResponseBody
	public List<String> Schedule_print(
			@RequestParam(value = "schedule_UUID", required = false) String schedule_UUID,
			@RequestParam(value = "schedule_ID", required = false) String schedule_ID, ScheduleVO schedulevo)
			throws Exception {

		Map<String, Object> response = new HashMap<>();
		// 다중 경유지 데이터 불러오기
		response.put("schedule_UUID", schedule_UUID);
		response.put("schedule_ID", schedule_ID);

		List<ScheduleVO> schedule_map = scheduleservice.Schedule_print(response);

		ArrayList<String> scheduleID_list = new ArrayList<String>();

		
		// 특정 리스트 데이터 출력
		for (ScheduleVO schedule : schedule_map) {
			if (!schedule.getSchedule_ID1().isEmpty()) { // 공백이면 리스트에 못들어감
				scheduleID_list.add(schedule.getSchedule_ID1());
			}
			if (!schedule.getSchedule_ID2().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID2());
			}
			if (!schedule.getSchedule_ID3().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID3());
			}
			if (!schedule.getSchedule_ID4().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID4());
			}
			if (!schedule.getSchedule_ID5().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID5());
			}
			if (!schedule.getSchedule_ID6().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID6());
			}
			if (!schedule.getSchedule_ID7().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID7());
			}
			if (!schedule.getSchedule_ID8().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID8());
			}
			if (!schedule.getSchedule_ID9().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID9());
			}
			if (!schedule.getSchedule_ID10().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID10());
			}
			if (!schedule.getSchedule_ID11().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID11());
			}
			if (!schedule.getSchedule_ID12().isEmpty()) {
				scheduleID_list.add(schedule.getSchedule_ID12());
			}
			
		}
		
		List<LocationVO> location_latlng = null;
		
		List<String> latlng_bundle = new ArrayList<>();
		
		List<String> latlng = new ArrayList<>();
		
		for (int num_id = 0; num_id < scheduleID_list.size(); num_id++) {
		    response.put("schedule_ID", scheduleID_list.get(num_id));
		    location_latlng = locationservice.Location_latlng(response);
		    
		    String locationString = location_latlng.toString();
		    latlng_bundle.add(num_id, locationString); // 메모장 내용 출력
		    
		    for (LocationVO locationVO : location_latlng) {
		        latlng.add(locationVO.getLocation_LNG()); // lng 데이터만 가져옴
		        latlng.add(locationVO.getLocation_LAT()); // lat 데이터만 가져옴
		    }
		}

		
		System.out.print(latlng);

		return latlng;
	}

}