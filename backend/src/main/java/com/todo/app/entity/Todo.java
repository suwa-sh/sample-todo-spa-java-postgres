package com.todo.app.entity;

public class Todo {

	private long id;
	private String title;
	private int done_flg;
	private String time_limit;

	public Todo() {
	}

	public void setId(long id) {
		this.id = id;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public void setDone_flg(int done_flg) {
		this.done_flg = done_flg;
	}
	public void setTime_limit(String time_limit) {
		this.time_limit = time_limit;
	}

	public long getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}
	public int getDone_flg() {
		return done_flg;
	}
	public String getTime_limit() {
		return time_limit;
	}

	@Override
	public String toString() {
		// json形式で出力
		return "{\"id\":" + id + ", \"title\":\"" + title + "\", \"done_flg\":" + done_flg + ", \"time_limit\":\"" + time_limit + "\"}";
	}
}
