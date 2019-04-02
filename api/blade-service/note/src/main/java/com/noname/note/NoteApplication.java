package com.noname.note;


import org.mybatis.spring.annotation.MapperScan;
import org.springblade.core.launch.BladeApplication;
import org.springblade.core.launch.constant.AppConstant;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * 笔记服务器
 *
 * @author chenlt
 */
@SpringCloudApplication
@EnableFeignClients(AppConstant.BASE_PACKAGES)
@MapperScan("com.noname.note.mapper")
public class NoteApplication {

	public static void main(String[] args) {
		BladeApplication.run("note", NoteApplication.class, args);
	}

}
