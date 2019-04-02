/**
 * Copyright (c) 2018-2028, Chill Zhuang 庄骞 (smallchill@163.com).
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.noname.note.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.noname.note.entity.Note;
import com.noname.note.vo.NoteVo;

import java.util.List;

/**
 * Mapper 接口
 *
 * @since 2018-12-24
 */
public interface NoteMapper extends BaseMapper<Note> {

	/**
	 * 树形结构
	 *
	 * @return
	 */
	List<NoteVo> tree(Integer userId);

	List<Note> getParents(Integer userId);

}
