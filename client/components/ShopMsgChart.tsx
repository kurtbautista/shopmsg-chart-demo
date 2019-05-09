'use strict'

import React from "react"
import { Card } from 'antd'
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts"
import DataSet from "@antv/data-set"
import { getDataSeries } from './chartData'
import ShopMsgAction from './shopMsgAction' 

interface RoleProps {
  ShopMsgAction: Array<string>
}

class ShopMsgChart extends React.Component<RoleProps, {}> {

  state = {
      dateRange : ['10/01','10/15'],
      fields : [
          {
            fieldName : 'optins',
            color: '#186dca',
            disabled : false,
            position : 0
          },
          {
            fieldName : 'recipients',
            color: '#ca1818',
            disabled : false,
            position : 1
          },
        ]
  }

  fieldDisableStatus = (checked, fieldName) => {
    const { fields } = this.state
    const newData = fields.filter( field => field.fieldName != fieldName)
    const getOptins = fields.find( field => field.fieldName === fieldName)
    getOptins.disabled = !checked
    newData.push(getOptins)
    const newDataSort = newData.sort( (a,b) => a.position - b.position)

    // This will change the disable status of a field 
    this.setState({
      ...this.state,
      fields : newDataSort
    })
  }

  onChangeDate = (date, dateString) => {
    // console.log('from date action', dateString)
    console.log(date, dateString)
    const startDate = dateString[0].split('-')
    const endDate = dateString[1].split('-')
    const sDate = startDate[1] + '/' + startDate[2] 
    const eDate = endDate[1] + '/' + endDate[2] 
    const dateRange = []
    dateRange.push(sDate)
    dateRange.push(eDate)
    console.log('dateRange',dateRange)
    this.setState({
      ...this.state,
        dateRange 
    })
  }
  
  onChangeOptins = (checked) => {
    console.log('from optins action', checked)
    const fieldName = 'optins'
    this.fieldDisableStatus(checked, fieldName)
  }

  onChangeRecipients = (checked) => {
    console.log('from recipients action', checked)
    const fieldName = 'recipients'
    this.fieldDisableStatus(checked, fieldName)
  }

  render() {
    // console.log(this.state)
    const { fields } = this.state

    const startDate = this.state.dateRange[0]
    const endDate = this.state.dateRange[1]

    const getFilteredData = getDataSeries(startDate, endDate)
    // console.log(getFilteredData)

    const activeFields = []
    const colorFields = []
    fields.filter( field => !field.disabled && activeFields.push(field.fieldName) && colorFields.push(field.color))

    // console.log('active fields', activeFields)
    // console.log('color fields', colorFields)

    const ds = new DataSet()
    const dv = ds.createView().source(getFilteredData)
    dv.transform({
      type: "fold",
      fields: activeFields,
      key: "count",
      value: "shop" 
    });
    
    const cols = {
      date: {
        range: [0, 1]
      }
    };

    return (
      <div>
        <ShopMsgAction 
          onChangeDate = { this.onChangeDate }
          onChangeOptins = {this.onChangeOptins}
          onChangeRecipients = {this.onChangeRecipients}
          switchStatus= {{
            optins : this.state.fields.find( field => field.fieldName == 'optins').disabled,
            recipients : this.state.fields.find( field => field.fieldName == 'recipients').disabled
          }}
        />
        <Card>
          <Chart height={400} data={dv} scale={cols} width={1000}>
            <Legend position="top" clickable={false} />
            <Axis name="date" />
            <Axis
              name="shop"
              label={{
                formatter: val => `${val}`
              }}
            />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom
            shape='optins'
              type="line"
              position="date*shop"
              size={2}
              color={['count', colorFields]}
            />
          </Chart>
        </Card>
      </div>
    );
  }
}

export default ShopMsgChart