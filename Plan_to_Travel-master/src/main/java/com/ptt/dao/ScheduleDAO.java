package com.ptt.dao;

import java.util.List;
import java.util.Map;

import com.ptt.model.LocationVO;
import com.ptt.model.ScheduleVO;

public interface ScheduleDAO {
	public void insertSchedule(ScheduleVO vo);
	
	public void changeSchedule(ScheduleVO schedulevo);
	
	// 출력
	public List<ScheduleVO> Schedule_print(Map<String, Object> response) throws Exception;
}
