import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { Button, Icon,  Cell } from '@nutui/nutui-react';
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Icon name="JD"/>
        <Cell title="我是标题" desc="描述文字" />
        <Cell title="我是标题" subTitle="副标题描述" desc="描述文字" />
        <Button type="primary" className='btn'>主要按钮</Button>
        <Button type="info" className='btn'>信息按钮</Button>
        <Button type="default" className='btn'>默认按钮</Button>
        <Button type="danger" className='btn'>危险按钮</Button>
        <Button type="warning" className='btn'>警告按钮</Button>
        <Button type="success" className='btn'>成功按钮</Button>
      </View>
    )
  }
}
