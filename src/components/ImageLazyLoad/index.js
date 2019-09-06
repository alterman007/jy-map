// 图片懒加载
import React, { useEffect } from 'react';


const threshold = [0.1] // 这是触发时机 0.01代表出现 1%的面积出现在可视区触发一次回掉函数 threshold = [0, 0.25, 0.5, 0.75]  表示分别在0% 25% 50% 75% 时触发回掉函数

// 利用 IntersectionObserver 监听元素是否出现在视口
const io = new IntersectionObserver((entries) => { // 观察者
  entries.forEach((item) => { // entries 是被监听的元素集合它是一个数组
    if (item.intersectionRatio <= 0) return // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
    const {target} = item
    target.src = target.dataset.src // 将 h5 自定义属性赋值给 src (进入可见区则加载图片)
    io.unobserve(target); // 停止观察当前元素 避免不可见时候再次调用callback函数
  })
}, {
  threshold, // 添加触发时机数组
});

const ImageLazyLoad = ({ imgsrc, imgClick }) => {
  const imgRef = React.useRef();
  const onload = () => {
    io.observe(imgRef.current)
  }
  useEffect(() => {
    return () => {
      io.disconnect(imgRef.current); // 组件卸载时取消监听;
    }
  }, [])
  return (
    <img data-src={imgsrc} src="" ref={imgRef} onError={onload} onClick={imgClick} />
  )
}

ImageLazyLoad.defaultProps = {
  imgClick: () => {}
}

export default ImageLazyLoad;