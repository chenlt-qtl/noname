import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import styles from '../SiderMenu/index.less';
import classNames from "classnames";

const SubMenu = Menu.SubMenu;

export default class SiderNote extends PureComponent {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
    onSelect: null,
  };

  /**
   * 获得子节点
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.title)
      .map(item => this.getSubMenuOrItem(item, parent))
      .filter(item => item);
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && item.children.some(child => child.title)) {
      const {
        onSelect,
      } = this.state;
      return (
        <SubMenu
          title={<span>
                <Icon type="folder" />
                <span>{item.title}</span>
              </span>}
          key={item.id}
          onTitleClick={onSelect}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.id}>{item.title}</Menu.Item>;
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const {
      treeData,
      onTreeSelect,
    } = this.props;
    this.setState({onSelect:onTreeSelect});
    return (
      <Menu
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        onSelect={onTreeSelect}
        key="Menu"
        mode="inline"
        style={{ padding: '16px 0', width: '100%',height:'100%' }}
      >
        {this.getNavMenuItems(treeData)}
      </Menu>
    );
  }
}
