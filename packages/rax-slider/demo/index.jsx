/* eslint-disable import/no-extraneous-dependencies */
import { createElement, Component, render, createRef } from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Slider from '../src/index';
import DU from 'driver-universal';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: [
        '//gw.alicdn.com/tfs/TB19NbqKFXXXXXLXVXXXXXXXXXX-750-500.png',
        '//gw.alicdn.com/tfs/TB1tWYBKFXXXXatXpXXXXXXXXXX-750-500.png',
        '//gw.alicdn.com/tfs/TB1SX_vKFXXXXbyXFXXXXXXXXXX-750-500.png'
      ]
    });
  }

  onchange = (e) => {
    console.log('change', e);
  }

  onClick = (direction) => {
    this.inputRef.current.slideTo(this.inputRef.current.index,
      direction === 'prev' ? 'SWIPE_RIGHT' : 'SWIPE_LEFT');
  }

  render() {
    return (
      <View>
        <Slider
          className="slider"
          width={750}
          height={500}
          autoPlay={true}
          index={0}
          loop={true}
          speed={300}
          cssEase="linear"
          showsPagination={true}
          paginationStyle={{
            position: 'absolute',
            width: '750rpx',
            height: '40rpx',
            bottom: '20rpx',
            left: 0,
            itemColor: 'rgba(255, 255, 255, 0.5)',
            itemSelectedColor: 'rgb(255, 80, 0)',
            itemSize: '16rpx'
          }}
          autoplayInterval={2000}
          onChange={this.onchange}
          ref={this.inputRef}
        >
          {this.state.data.map((item) => (
            <View key={item} className="itemWrap">
              <Image className="image" source={{ uri: item }} />
            </View>))}
        </Slider>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <View onClick={this.onClick.bind(this, 'prev')}>prev</View>
          <View onClick={this.onClick.bind(this, 'next')}>next</View>
        </View>
      </View>
    );
  }
}

render(<App />, document.body, { driver: DU });
