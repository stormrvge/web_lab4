import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {SVGListenerService} from '../utils/SVGListener.service';
import {HttpClient} from '@angular/common/http';
import {SvgUtils} from '../utils/SvgUtils';

export interface Circle {
  x: number;
  y: number;
  fillColor: string;
}

export interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent implements OnInit {
  circleArray: Circle[];
  pixelStep = 45;

  // @ts-ignore
  radius: number;
  // @ts-ignore
  subscription: Subscription;

  // @ts-ignore
  @ViewChild('svg') svg: SVGSVGElement;

  constructor(private http: HttpClient, private radiusListenerService: SVGListenerService) {
    this.circleArray = [];
  }

  ngOnInit(): void {
    this.subscription = this.radiusListenerService.getRadius()
      .subscribe(radius => {
        this.radius = radius;
        this.circleArray = [];

        this.http.get('http://localhost:8080/rest/getDotsByRadius', {params: {
            r: radius.toString()}, observe: 'response', withCredentials: true})
          .subscribe((data: any) => {
            if (data.body.hasError) {
              console.log(data);
            } else {
              const newCircles = data.body.data;
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < newCircles.length; i++) {
                const normalizedPoint = SvgUtils.normalizeCirclePosition(newCircles[i].x, newCircles[i].y, 45);
                let fill: string;
                newCircles[i].hit ? fill = 'green' : fill = 'red';

                this.circleArray.push({x: normalizedPoint.x, y: normalizedPoint.y, fillColor: fill});
              }
            }
          });
      });
  }

  onClick(event: MouseEvent): void {
    console.log(event);
    const point = SvgUtils.convertToPoint(event.offsetX, event.offsetY, this.pixelStep);
    const pixels = SvgUtils.normalizeCirclePosition(point.x, point.y, this.pixelStep);

    let fill: string;

    this.http.get('http://localhost:8080/rest/image', {params: {
        x: point.x.toString(),
        y: point.y.toString(),
        r: this.radius.toString()}, observe: 'response', withCredentials: true})
      .subscribe((data: any) => {
        if (data.body.hasError) {
          console.log(data);
        } else {
          data.body.data.hit ? fill = 'green' : fill = 'red';
          const circle = {x: pixels.x, y: pixels.y, fillColor: fill};

          this.circleArray.push(circle);
          this.radiusListenerService.invokeRefresh.next(true);
          // this.router.navigate(['/main']);
        }
      });
  }
}
