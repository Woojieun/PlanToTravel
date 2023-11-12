package com.ptt.dao;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ptt.model.LocationVO;
import com.ptt.model.ScheduleVO;

@Repository // DAO라고 명시
public class ScheduleDAOImp implements ScheduleDAO{
    @Inject // 의존관계를 자동으로 연결(JAVA에서 제공) ==@autowired (Spring에서 제공)
    private SqlSession sqlSession;
   
   
    private static final String namespace = "com.ptt.mapper.LocationMapper";
                                            //memberMapper.xml의 namespace값
    
	@Override
	public void insertSchedule(ScheduleVO vo) {
		// TODO Auto-generated method stub
		sqlSession.insert(namespace+".insertSchedule", vo);
	}

	@Override
	public void changeSchedule(ScheduleVO schedulevo) {
		// TODO Auto-generated method stub
		sqlSession.update(namespace+".changeSchedule", schedulevo);
	}
	
	// 데이터 출력
    @Override
    public List<ScheduleVO> Schedule_print(Map<String, Object> response) throws Exception {
    	return sqlSession.selectList(namespace + ".Schedule_print", response);
    }
}
