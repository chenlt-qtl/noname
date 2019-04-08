import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import {Spin, Menu, Icon, Avatar, message, Modal} from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import router from "umi/router";

export default class UserCenter extends PureComponent {
  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'userCenter') {
      message.success('即将开放');
      // router.push('/account/center');
      return;
    }
    if (key === 'userinfo') {
      message.success('即将开放');
      // router.push('/account/settings/base');
      return;
    }
    if (key === 'triggerError') {
      router.push('/exception/trigger');
      return;
    }
    if (key === 'logout') {
      Modal.confirm({
        title: '退出确认',
        content: '是否确定退出登录？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'login/logout',
          });
        },
        onCancel() {},
      });
    }
  };

  render() {
    const {
      currentUser,
    } = this.props;
    const menu = (
      <Menu
        className={styles.menu}
        style={{ marginRight: 1 }}
        selectedKeys={[]}
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    const content = currentUser.name ?
        (<HeaderDropdown overlay={menu} style={{ marginRight: 8 }}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )
    return content;
  }
}
