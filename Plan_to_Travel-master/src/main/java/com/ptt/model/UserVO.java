package com.ptt.model;

public class UserVO {
	
	//회원 아이디
	private String uID;
	
	//회원 비밀번호
	private String uPW;
	
	//회원 이메일
	private String uEMAIL;

	public String getuID() {
		return uID;
	}

	public void setuID(String uID) {
		this.uID = uID;
	}

	public String getuPW() {
		return uPW;
	}

	public void setuPW(String uPW) {
		this.uPW = uPW;
	}

	public String getuEMAIL() {
		return uEMAIL;
	}

	public void setuEMAIL(String uEMAIL) {
		this.uEMAIL = uEMAIL;
	}
	
	@Override
	public String toString() {
		return "UserVO [uID=" + uID + ", uPW=" + uPW + ", uEMAIL=" + uEMAIL +"]";
	}

}
