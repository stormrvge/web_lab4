import {Point} from '../svg/svg.component';

export class SvgUtils {
  static convertToPoint(xPixel: number, yPixel: number, pixelStep: number): Point {
    const pointX = Math.round((xPixel - 225) / pixelStep);
    const pointY = this.round(((yPixel - 225) / -pixelStep), 0.1);

    return {x: pointX, y: pointY};
  }

  static normalizeCirclePosition(xPoint: number, yPoint: number, pixelStep: number): Point {
    const xPixels = (225 + xPoint * pixelStep);
    const yPixels = (225 + yPoint * -pixelStep);

    return {x: xPixels, y: yPixels};
  }

  private static round(value: number, step: number): number {
    const inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  }
}
