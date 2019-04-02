package com.noname.note.controller;

import com.noname.note.entity.Note;
import com.noname.note.service.NoteService;
import com.noname.note.vo.NoteVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springblade.core.boot.ctrl.BladeController;
import org.springblade.core.secure.BladeUser;
import org.springblade.core.secure.utils.SecureUtil;
import org.springblade.core.tool.api.R;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/note")
@Api(value = "笔记", tags = "笔记")
public class NoteController extends BladeController {

	private NoteService noteService;

	/**
	 * 获取角色树形结构
	 */
	@GetMapping("/list")
	@ApiOperation(value = "树形结构", notes = "树形结构", position = 3)
	public R<List<NoteVo>> tree() {
		BladeUser user = SecureUtil.getUser();
		List<NoteVo> tree = noteService.tree(user.getUserId());
		return R.data(tree);
	}


	@GetMapping("/parents")
	public R<List<Note>> getParents() {
		BladeUser user = SecureUtil.getUser();
		List<Note> tree = noteService.getParents(user.getUserId());
		return R.data(tree);
	}
}
