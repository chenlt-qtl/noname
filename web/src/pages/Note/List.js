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
import SelectNote from "../../components/Note/SelectNote";
import { getCurrentUser } from '../../utils/authority';
import {NOTE_INIT,GET_TABS,GET_TREE,GET_NOTE} from "../../actions/note";
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

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
    selectValue: undefined,
    tabValue: undefined,
    treeValue: undefined,
  };
  componentWillMount() {
    const {
      dispatch,
    } = this.props;

    dispatch(NOTE_INIT(currentUser));
  }

  onTabSelect = (value) =>{
    const {
      dispatch,
    } = this.props;

    dispatch(GET_TREE(value));
  }


  onParentSelect = (value) =>{
    const {
      dispatch,
    } = this.props;

    dispatch(GET_TABS(value));
  };

  onTreeSelect = (item) =>{
    const {
      dispatch,
    } = this.props;
    dispatch(GET_NOTE(item.key));
  };

  render() {
    const {
      note: {
        selectValue,
        selectData,
        tabValue,
        tabData,
        treeValue,
        treeData,
        noteData,
      },
    } = this.props;
    const noteContent = BraftEditor.createEditorState(noteData["content"]);
    const tabs = tabData.map(d => <TabPane tab={d.title} key={d.id}></TabPane>);
    const contentTip = (
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
            {tabs}
          </Tabs>
          <div className={styles.right} style={{ marginRight: 8 }}>
            <SelectNote onParentSelect = {this.onParentSelect}
            selectValue={selectValue} selectData={selectData}/>

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
            <UserCenter currentUser={currentUser} style={{margin:13}}/>
          </div>
        </Header>
        <Layout>
          <Sider width={240} style={{ background: '#fff' }}>
            <SiderNote treeData={treeData} onTreeSelect={this.onTreeSelect}/>
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
                  <Popover placement="bottomRight" content={contentTip} title="笔记信息">
                    <Icon type="info-circle" />
                  </Popover>
                </Col>
              </Row>
            </div>


            <Content them='light' style={{
              background: '#fff', margin: 0
            }}
            >
              <Form style={{padding:15}}>
                <Input name='title' value={noteData.title} placeholder="标题" style={{border:'none'}}/>
                <BraftEditor value={noteContent} />
              </Form>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default NoteList;
