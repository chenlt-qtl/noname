import {
  Layout, Breadcrumb, Icon, Tabs, Select, Divider,
  Card, Form, Row, Col, Popover, Input,
} from 'antd';
import React from "react";
import {connect} from "dva";
import { FormattedMessage, formatMessage } from 'umi/locale';
import styles from "../../components/GlobalHeader/index.less";
import HeaderSearch from "../../components/HeaderSearch";
import UserCenter from "../../components/GlobalHeader/UserCenter";
import SiderNote from "../../components/Note/SiderNote";
import { getCurrentUser } from '../../utils/authority';

const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

const Option = Select.Option;

const currentUser = getCurrentUser();
if(!currentUser){
  console.log('用户未登录');
}

@connect(({ note, loading }) => ({
  note,
  loading: loading.models.note,
}))
class NoteList extends React.Component {

  state = {
    user: currentUser,
    tabPid: null,
    treePid: null,
  };

  onParentSelect = (value) =>{
    const {
      dispatch,
    } = this.props;

    dispatch(GET_TABS(value));
  };

  onTabSelect = (value) =>{
    const {
      dispatch,
    } = this.props;

    dispatch(GET_TREE(value));
  }

  render() {
    const {
      note: {
        parents,
        tabs,
      },
    } = this.props;

    const parentOption = parents.map(d => <Option key={d.id}>{d.title}</Option>);
    const tabData = tabs.map(d => <TabPane tab={d.title} key={d.id}></TabPane>);
    let treeData = [];
    if(tabs.length>0){
      treeData = this.state.tree[tabs[0]['id']];
    }
    console.log(treeData);

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
          <Tabs type="card" style={{marginTop: '10px',marginRight: '100px',display:'inline-block'}}
            onChange={this.onTabSelect}>
            {tabData}
          </Tabs>
          <div className={styles.right} style={{ marginRight: 8 }}>

            <Select style={{ width: 200 ,marginRight: 5 }} value={parents.length>0?parents[0]['id']:''}
                    onSelect={this.onParentSelect}
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
            <UserCenter currentUser={currentUser}/>
          </div>
        </Header>
        <Layout>
          <Sider width={240} style={{ background: '#fff' }}>
            <SiderNote/>
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
