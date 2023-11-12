package com.ptt.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptt.mapper.LocationMapper;
import com.ptt.mapper.ScheduleMapper;
import com.ptt.model.ScheduleVO;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
	LocationMapper locationMapper;
	
	public List<ScheduleVO> Schedule_print(Map<String, Object> response) throws Exception {

		return locationMapper.Schedule_print(response);
	}
}
