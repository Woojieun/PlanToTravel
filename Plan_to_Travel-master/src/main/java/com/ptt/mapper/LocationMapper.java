package com.ptt.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import com.ptt.model.LocationVO;
import com.ptt.model.ScheduleVO;

@Mapper
public interface LocationMapper {
	
	// 아이디 중복 검사
	public int idCheck(Map<String, Object> params);

	// 스케쥴 중복 검사
	public int scheduleCheck(Map<String, Object> params);
	
	// 아이디 중복 검사
	public int idmodifyCheck(Map<String, Object> params);

	// 스케쥴 중복 검사
	public int schedulemodifyCheck(Map<String, Object> params);
	
	public List<LocationVO> Location_print(Map<String, Object> map);

	public List<ScheduleVO> Schedule_print(Map<String, Object> response);
	
	public List<LocationVO> Location_latlng(Map<String, Object> response);
}
