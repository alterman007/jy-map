import { Marker } from 'leaflet';
import * as turf from '@turf/turf';
import { moveIcon } from './icons';

const defaultOption = {
  icon: moveIcon,
  duration: 30000,
  repeat: true,
};

class MoveMarker {
  constructor(map, path, option = defaultOption) {
    this.map = map;
    this.path = path;
    this.option = Object.assign(defaultOption, option);
    this.init();
  }

  init() {
    this.pathLength = turf.length(this.path);
    this.startTime = Date.now();
    const initPos = this.getLinePointByPercent(0);
    this.marker = new Marker(initPos, { icon: this.option.icon });
    this.map.addLayer(this.marker);
    this.move();
  }

  move = () => {
    const rate = (Date.now() - this.startTime) / this.option.duration;
    if (rate > 1) {
      if (this.option.repeat) {
        this.startTime = Date.now();
        this.move();
      } else {
        return;
      }
    }
    const position = this.getLinePointByPercent(rate).concat();
    this.marker.setLatLng(position.reverse());
    this.raf = requestAnimationFrame(this.move);
  }

  getLinePointByPercent(rate = 0) {
    rate = Math.min(Math.max(0, rate), 1);
    return turf.getCoord(turf.along(this.path, this.pathLength * rate));
  }

  destroy() {
    this.raf && cancelAnimationFrame(this.raf);
    this.map.removeLayer(this.marker);
  }
}

export default MoveMarker;
