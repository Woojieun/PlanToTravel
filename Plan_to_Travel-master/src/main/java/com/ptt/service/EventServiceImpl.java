package com.ptt.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptt.dao.EventDAO;
import com.ptt.mapper.LocationMapper;
import com.ptt.model.EventVO;

@Service
public class EventServiceImpl implements EventService {
	
	@Autowired
    private final LocationMapper locationMapper;

    @Autowired
    private EventDAO eventDAO;
    
    @Autowired
    public EventServiceImpl(LocationMapper locationMapper, EventDAO eventDAO) {
		this.locationMapper = locationMapper;
        this.eventDAO = eventDAO;
    }
    
    @Override
    public boolean event_Chk(String sche_id, String event_date) {
        return locationMapper.event_Chk(sche_id, event_date);
    }


    @Override
    public List<EventVO> event_print(String event_id) throws Exception {
        return eventDAO.event_print(event_id);
    }
    
    
    @Override
    public List<EventVO> latlng_print(Map<String, Object> params) throws Exception {
        return eventDAO.latlng_print(params);
    }
    
	@Override
	public void event_change(EventVO vo) throws Exception {
		eventDAO.event_change(vo);
	}
}
