package com.ptt.model;

public class UserVO {
	
//회원 아이디
	private String u_id;
	
	//회원 비밀번호
	private String u_pw;
	
	//회원 이메일
	private String u_email;

	
	
	public String getU_id() {
		return u_id;
	}

	public void setU_id(String u_id) {
		this.u_id = u_id;
	}

	public String getU_pw() {
		return u_pw;
	}

	public void setU_pw(String u_pw) {
		this.u_pw = u_pw;
	}

	public String getU_email() {
		return u_email;
	}

	public void setU_email(String u_email) {
		this.u_email = u_email;
	}

	@Override
	public String toString() {
		return "UserVO [u_id=" + u_id + ", u_pw=" + u_pw + ", u_email=" + u_email + "]";
	}
	
	
}
