package com.ptt.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LocationMapper {
	
	// 아이디 중복 검사
	public int idCheck(Map<String, Object> params);

}
