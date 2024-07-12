import Taro from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'
import { ThreadList } from '../../components/thread_list'
import api from '../../utils/api'

import './index.css'

class Index extends React.Component {
  config = {
    navigationBarTitleText: '首页',
  }

  state = {
    loading: true,
    threads: [],
  }

  async componentDidMount() {
    try {
      const res = await Taro.request({
        url: api.getLatestTopic(),
      })
      this.setState({
        threads: res.data,
        loading: false,
      })
    } catch (error) {
      Taro.showToast({
        title: '载入远程数据错误',
      })
    }
  }

  render() {
    const { loading, threads } = this.state
    return (
      <View className="index">
        <ThreadList threads={threads} loading={loading} />
      </View>
    )
  }
}

export default Index
