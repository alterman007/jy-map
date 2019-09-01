import React from 'react';
import Rotate from './rotate';
import './index.styl';


class Switcher extends React.Component {
  rotateRef = React.createRef();

  state = {
    buttonList: [
      '联网警力',
      '联网告警',
      '实时警力',
      '实时电台',
      '热力图',
    ],
    clickedIndex: 0,
  };

  rotateByIndex(i) {
    const radio = 2 * i / this.state.buttonList.length * Math.PI;
    const r = 228;
    const x = r * Math.cos(radio);
    const y = r * Math.sin(radio);
    const rotate = 90 - 360 * i / this.state.buttonList.length;
    return ({
      transform: `translate(${x}px, ${y}px) rotateX(-90deg) translateY(-39%) rotateY(${rotate}deg)`,
    });
  }

  onClick(i) {
    this.setState({
      clickedIndex: i,
    });
  }

  componentDidMount() {
    this.r = new Rotate(this.rotateRef.current);
    this.r.rotate();
  }

  componentWillUnmount() {
    this.r.destroy();
  }

  render() {
    const { buttonList, clickedIndex } = this.state;
    return (
      <div className="switcher-wrapper">
        <div className="btn-transform">
          <div className="btn-rotate" ref={this.rotateRef}>
            {
              buttonList.map((name, i) => (
                <div className="btn-center" key={name}>
                  <div
                    className="btn"
                    style={this.rotateByIndex(i)}
                    onClick={this.onClick.bind(this, i)}
                  >{name}</div>
                </div>
              ))
            }
          </div>
          <div className="current">
            {buttonList[clickedIndex]}
          </div>
        </div>
      </div>
    );
  }
}

export default Switcher;
