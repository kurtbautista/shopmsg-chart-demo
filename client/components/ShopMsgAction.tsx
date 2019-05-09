import React, { Component } from 'react'
import { Row, Col, DatePicker, Switch, Card } from 'antd'
const { RangePicker } = DatePicker

interface ActionProps {
    onChangeOptins: any
    onChangeRecipients: any
    onChangeDate: any
    switchStatus: any
}
class ShopMsgAction extends Component<ActionProps> {

  render() {
      // console.log(this.props)
    const { onChangeOptins, onChangeDate, onChangeRecipients, switchStatus } = this.props
    const dateFormat = 'MM/DD';
    return (
      <div>
         <Card style={{marginBottom: 20}}>
         <Row gutter={16} style={{ marginBottom : 5}}>
              <Col span={4} style={{textAlign: 'right'}}><div className="gutter-box">Date Range :</div></Col>
              <Col span={20}><div className="gutter-box" >
                <RangePicker onChange={ onChangeDate }/></div></Col><br /><br />
              </Row>
              <Row gutter={16} style={{ marginBottom : 5}}>
              <Col span={4} style={{textAlign: 'right'}}><div className="gutter-box">Show Optins :</div></Col>
              <Col span={20}><div className="gutter-box"><Switch size="small" disabled={switchStatus.recipients} defaultChecked onChange={ onChangeOptins } /></div></Col>
              </Row>
              <Row gutter={16} style={{ marginBottom : 5}}>
              <Col span={4} style={{textAlign: 'right'}}><div className="gutter-box">Show Recipients :</div></Col>
              <Col span={20}><div className="gutter-box"><Switch size="small" disabled={switchStatus.optins} defaultChecked onChange={onChangeRecipients} /></div></Col>
              </Row>
          </Card> 
      </div>
    )
  }
}

export default ShopMsgAction
