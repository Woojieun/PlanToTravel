package com.ptt.mapper;

import java.util.List;

import com.ptt.model.HistoryVO;

public interface HistoryMapper {
	
	//HistoryVO를 파라미터로 하고 HistoryVO로 변환받는 메서드
	public List<HistoryVO> selectHistory(HistoryVO history);
}