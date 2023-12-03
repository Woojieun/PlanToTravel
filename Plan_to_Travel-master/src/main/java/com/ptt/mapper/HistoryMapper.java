package com.ptt.mapper;

import java.util.List;

import com.ptt.model.HistoryVO;
import com.ptt.model.ScheduleVO;

public interface HistoryMapper {
	
	//HistoryVO를 파라미터로 하고 HistoryVO로 변환받는 메서드
	//History 목록 불러오기
	public List<HistoryVO> selectHistory(HistoryVO history);
	
	//히스토리에 있는 스케줄 하나 클릭
	public List<ScheduleVO> getSchedule (String schedule_UUID);
}