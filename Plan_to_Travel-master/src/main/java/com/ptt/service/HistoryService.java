package com.ptt.service;

import java.util.List;

import com.ptt.model.HistoryVO;

public interface HistoryService {
	
	public List<HistoryVO> selectHistory(HistoryVO history) throws Exception;
	
}