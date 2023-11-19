package com.ptt.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptt.model.EventVO;
import com.ptt.model.ScheduleVO;

@Mapper
public interface ScheduleMapper {
	public List<ScheduleVO> Schedule_print(Map<String, Object> response);
	
	//HistoryVO를 파라미터로 하고 HistoryVO로 변환받는 메서드
	public List<ScheduleVO> selectHistory(ScheduleVO history);
	
	public List<EventVO> getSchedule (String sche_id);
}