package com.ptt.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptt.model.ScheduleVO;

@Mapper
public interface ScheduleMapper {
	public List<ScheduleVO> Schedule_print(Map<String, Object> response);
}
