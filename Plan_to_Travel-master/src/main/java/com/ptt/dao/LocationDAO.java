package com.ptt.dao;

import com.ptt.model.LocationVO;

public interface LocationDAO {
	
	public void insertMember(LocationVO vo);
	
	public LocationVO selectMember(LocationVO vo);

	public int checkId(String location_UUID, String location_ID);

	
}
