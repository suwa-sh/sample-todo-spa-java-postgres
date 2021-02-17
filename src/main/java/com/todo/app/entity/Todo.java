package com.todo.app.entity;

import java.sql.Date;

import lombok.Data;

@Data
public class Todo {

	private long id;
	private String title;
	private int done_flg;
	private Date time_limit;
}
