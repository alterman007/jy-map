// 图片懒加载
import React, { useEffect } from 'react';
import demoImage from './demo.png';
import './index.styl';

// const threshold = [0.1] 
// const io = new IntersectionObserver((entries) => {
//   entries.forEach((item) => { 
//     if (item.intersectionRatio <= 0) return 
//     const {target} = item
//     target.src = target.dataset.src 
//     io.unobserve(target); 
//   })
// }, {
//   threshold, 
// });

const ImageLazyLoad = ({ imgsrc, imgClick }) => {
  const imgRef = React.useRef();
  const threshold = [0.1] 
  const io = new IntersectionObserver((entries) => {
    entries.forEach((item) => { 
      if (item.intersectionRatio <= 0) return 
      const {target} = item
      target.src = target.dataset.src 
      io.unobserve(target); 
    })
  }, {
    threshold, 
  });

  useEffect(() => {
    io.observe(imgRef.current)
    return () => {
      io.disconnect(imgRef.current); 
    }
  }, [])
  return (
    <img
      className="lazyload-img"
      data-src={imgsrc}
      src=""
      ref={imgRef}
      onClick={imgClick}
      style={{ cursor: 'pointer' }}
    />
  )
}

ImageLazyLoad.defaultProps = {
  imgClick: () => { },
  imgsrc: demoImage
}

export default ImageLazyLoad;