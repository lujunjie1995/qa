import React, { Component } from 'react';
import { message, List, Icon, Spin, Row, Col } from 'antd';
import request from 'superagent';

class Message extends Component {
	state = {
		loading: false,
		data: [],
	}

	componentDidMount() {

	}

  onSearch() {
    this.setState({ loading: true });
    request.post('reply/').send().then(res => {
      if (res.body.sucMsg) {
        const { data } = res.body;
        this.setState({ loading: false, data });
      } else {
        message.error(res.body.errMsg);
        this.setState({ loading: false });
      }
    });
  }

  back() {
    this.props.history.goBack();
  }

  renderItem(item) {

    return (
      <List.Item className="listItem" key={item.id} >
        <div className="listTitle" >{item.title}</div>
        <div className="itemCtn" >
          {item.content}
        </div>
      </List.Item>
    );
  }

  render() {
  	const { loading, data } = this.state;

    return (
    	<div>
        <Row className="titleBar" >
          <Col onClick={this.back.bind(this)} span={4}>
            <Icon className="back-btn" type="arrow-left" />
          </Col>
          <Col span={16}>
            {'我的消息'}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Message;