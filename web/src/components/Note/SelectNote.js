import React, { PureComponent } from 'react';
import {Menu, Icon, Divider, Select} from 'antd';
const SubMenu = Menu.SubMenu;

export default class SelectNote extends PureComponent {

  render() {
    const {
      onParentSelect,
      selectValue,
      selectData,
    } = this.props;
    const parentOption = selectData.map(d => <Option key={d.id}>{d.title}</Option>);
    return (
      <Select style={{ width: 200 ,marginRight: 5 }} value={selectValue}
              onSelect={onParentSelect}
              dropdownRender={parent => (
                <div>
                  {parent}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ padding: '8px', cursor: 'pointer' }}>
                    <Icon type="setting" /> 管理笔记本
                  </div>
                </div>
              )}
      >
        {parentOption}
      </Select>
    );
  }
}
