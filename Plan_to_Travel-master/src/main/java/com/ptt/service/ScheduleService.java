package com.ptt.service;

import java.util.List;
import java.util.Map;

import com.ptt.model.ScheduleVO;

public interface ScheduleService {
	// 스케줄 데이터 출력
		public List<ScheduleVO> Schedule_print(Map<String, Object> response) throws Exception;
}
