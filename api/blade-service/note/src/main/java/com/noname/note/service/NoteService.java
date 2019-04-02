package com.noname.note.service;

import com.noname.note.entity.Note;
import com.noname.note.mapper.NoteMapper;
import com.noname.note.vo.NoteVo;
import org.springblade.core.mp.base.BaseServiceImpl;
import org.springblade.core.tool.node.ForestNodeMerger;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService extends BaseServiceImpl<NoteMapper, Note> {

	public List<NoteVo> tree(Integer userId) {
		return ForestNodeMerger.merge(baseMapper.tree(userId));
	}

	public List<Note> getParents(Integer userId) {
		return baseMapper.getParents(userId);
	}
}
