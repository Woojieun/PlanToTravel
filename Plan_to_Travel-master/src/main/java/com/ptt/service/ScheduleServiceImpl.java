package com.ptt.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptt.mapper.LocationMapper;
import com.ptt.mapper.ScheduleMapper;
import com.ptt.model.EventVO;
import com.ptt.model.ScheduleVO;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
	LocationMapper locationMapper;
	
	@Autowired
	ScheduleMapper schedulemapper;
	
	
	public List<ScheduleVO> Schedule_print(Map<String, Object> response) throws Exception {

		return locationMapper.Schedule_print(response);
	}
	
	//히스토리 목록 불러오기
	@Override
    public List<ScheduleVO> selectHistory(ScheduleVO history) throws Exception {
        return schedulemapper.selectHistory(history);
    }
	
	//히스토리 클릭 후 해당 스케줄 표 불러오기
    @Override
    public List<EventVO> getSchedule(String sche_id) {
        return schedulemapper.getSchedule(sche_id);
    }
    
}