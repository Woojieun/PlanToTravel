package com.ptt.mapper;

import java.util.List;

import com.ptt.model.FavoriteVO;

public interface FavoriteMapper {

	//즐겨찾기 추가
	public void addFavorite(FavoriteVO favoriteVO);
	
	//즐겨찾기 목록 불러오기
	public List<FavoriteVO> selectFavorite(FavoriteVO favorite);
	
	//즐겨찾기 삭제
	public void deleteFav (String fav_id);
	
}
