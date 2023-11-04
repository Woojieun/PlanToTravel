package com.ptt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptt.mapper.HistoryMapper;
import com.ptt.model.HistoryVO;

@Service
public class HistoryServicelmp implements HistoryService {
	
	@Autowired
	HistoryMapper historymapper;
	
	/*히스토리 목록 불러오기 기능*/
	@Override
	/*
	public HistoryVO selectHistory(HistoryVO history) throws Exception {

		return historymapper.selectHistory(history);
	}
	*/
	
    public List<HistoryVO> selectHistory(HistoryVO history) throws Exception {
        return historymapper.selectHistory(history);
    }

}