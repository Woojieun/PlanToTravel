package com.ptt.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptt.mapper.LocationMapper;

@Service
public class LocationServiceImpl implements LocationService {
	@Autowired
	LocationMapper locationMapper;
	
	@Override
	public boolean idCheck(String location_UUID, String location_ID) throws Exception {
		Map<String, Object> params = new HashMap<>();
        params.put("location_UUID", location_UUID);
        params.put("location_ID", location_ID);
        
        int count = locationMapper.idCheck(params);

        // count가 1 이상이면 데이터가 이미 존재하므로 사용할 수 없음을 의미
        return (int) count <= 0;
		/* return locationMapper.idCheck(location_UUID, location_ID); */
	}
}
