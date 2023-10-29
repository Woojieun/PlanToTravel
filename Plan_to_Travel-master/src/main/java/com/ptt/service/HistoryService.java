package com.ptt.service;

import com.ptt.model.HistoryVO;

public interface HistoryService {
	
	public HistoryVO selectHistory(HistoryVO history) throws Exception;

}