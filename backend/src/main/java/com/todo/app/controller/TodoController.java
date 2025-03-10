package com.todo.app.controller;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.app.entity.Todo;
import com.todo.app.mapper.TodoMapper;

@RestController
public class TodoController {

	Logger logger = Logger.getLogger(TodoController.class.getName());

	@Autowired
	TodoMapper todoMapper;

	@RequestMapping(value="/todos", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> index(Model model) {

		List<Todo> list = todoMapper.selectIncomplete();
		List<Todo> doneList = todoMapper.selectComplete();
		Map<String, List<Todo>> res = new HashMap<>();
		res.put("todos", list);
		res.put("doneTodos", doneList);

		return new ResponseEntity<>(mapToJson(res), HttpStatus.OK);
	}

	@PostMapping(value="/todos")
	public ResponseEntity<String> add(@RequestBody Todo todo) {
		todoMapper.add(todo);
		return new ResponseEntity<>(todo.toString(), HttpStatus.OK);
	}

	@PutMapping(value="/todos/{id}")
	public ResponseEntity<String> update(@PathVariable String id, @RequestBody Todo todo) {
		// TODO 普通は、DBから取得して更新するが、元のサンプルでの妥協に合わせる
		//      path varのidは使っていない
		todoMapper.update(todo);
		return new ResponseEntity<>(todo.toString(), HttpStatus.OK);
	}

	// TODO 元のサンプルの仕様に合わせたけど、RESTfulなAPIにするなら違和感がある
	//      今回は、`todo群のうちdoneステータスのもの`というresourceのdeleteにした
	@DeleteMapping(value="/todos/done")
	public ResponseEntity<String> deleteDoneItems() {
		todoMapper.delete();
		return new ResponseEntity<>("", HttpStatus.OK);
	}

	private String mapToJson(Map<String, List<Todo>> obj) {
		StringBuilder json = new StringBuilder();
		json.append("{");
		for (Map.Entry<String, List<Todo>> entry : obj.entrySet()) {
			json.append("\"").append(entry.getKey()).append("\":");
			json.append(entry.getValue().toString());
			json.append(",");
		}
		json.setLength(json.length() - 1); // 最後のカンマを削除
		json.append("}");
		return json.toString();
	}

}
