import {
  Layout, Menu, Breadcrumb, Icon, Tabs, Select, Divider, Avatar, Spin, message, Modal, Dropdown,
  Card, Form, Row, Col, Popover, Input,
} from 'antd';
import React from "react";
import {connect} from "dva";
import { FormattedMessage, formatMessage } from 'umi/locale';
import styles from "../../components/GlobalHeader/index.less";
import HeaderSearch from "../../components/HeaderSearch";
import router from "umi/router";
import { getCurrentUser } from '../../utils/authority';
import {GET_PARENTS} from "../../actions/note";


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

const Option = Select.Option;

@connect(({ dict }) => ({
  dict,
}))

class NoteList extends React.Component {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  componentWillMount() {
    console.log(this.props);
    const {
      dispatch,
    } = this.props;

    dispatch(GET_PARENTS());
  }

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

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  render() {
    const currentUser = getCurrentUser();
    if(!currentUser){
      console.log('用户未登录');
    }
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

    const content = (
      <div>
        <p>创建日期:20190301</p>
        <p>修改日期:20190305</p>
      </div>
    );

    return(
      <Layout style={{height:'100%'}}>
        <Header className="header" style={{backgroundColor: '#fff',borderBottom:'1px solid #e8e8e8',height: '50px',
          paddingRight:0 ,lineHeight: '50px'}}>
          <div className="logo" />
          <Tabs type="card" style={{marginTop: '10px',marginRight: '100px',display:'inline-block'}}>
            <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
          <div className={styles.right} style={{ marginRight: 8 }}>

            <Select
              defaultValue="lucy"
              style={{ width: 200 ,marginRight: 5 }}
              dropdownRender={menu => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ padding: '8px', cursor: 'pointer' }}>
                    <Icon type="plus" /> 增加笔记
                  </div>
                </div>
              )}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
            <HeaderSearch
              className={`${styles.action} ${styles.search}`}
              placeholder={formatMessage({ id: 'component.note.search' })}
              dataSource={[
                formatMessage({ id: 'component.globalHeader.search.example1' }),
                formatMessage({ id: 'component.globalHeader.search.example2' }),
                formatMessage({ id: 'component.globalHeader.search.example3' }),
              ]}
              onSearch={value => {
                console.log('input', value); // eslint-disable-line
              }}
              onPressEnter={value => {
                console.log('enter', value); // eslint-disable-line
              }}
            />
            {currentUser.name ? (
              <Dropdown overlay={menu} >
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    src={currentUser.avatar}
                    alt="avatar"
                    style={{margin:'13px 5px'}}
                  />
                  <span className={styles.name}>{currentUser.name}</span>
                </span>
              </Dropdown>
            ) : (
              <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
            )}
          </div>
        </Header>
        <Layout>
          <Sider width={240} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              inlineIndent={18}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <div style={{padding:'10px'}}>
              <Row gutter={24}>
                <Col className="gutter-row" span={20}>
                  <Breadcrumb style={{}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col className="gutter-row" span={4} style={{textAlign:'right'}}>
                  <Popover placement="bottomRight" content={content} title="笔记信息">
                    <Icon type="info-circle" />
                  </Popover>
                </Col>
              </Row>
            </div>


            <Content style={{
              background: '#fff', padding: 10, margin: 0, minHeight: 280,
            }}
            >
              <Form hideRequiredMark>
                <Card title="基本信息" className={styles.card} bordered={false}>
                  <TextArea rows={20} />
                </Card>
              </Form>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default NoteList;
