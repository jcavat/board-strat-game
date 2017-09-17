import {Component, Input, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as d3hex from 'd3-hexbin';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }


  private width: number = 1000;
  @Input('width')
  set setWidth(n: number) {
    this.width= n;
    this.boardWidth = this.width + this.hexSize;
  }

  private height: number = 1000;
  @Input('height')
  set setHeight(n: number) {
    this.height = n;
    this.boardHeight = this.height + 2*this.hexSize;
  }

  readonly hexSize = 20;
  readonly hexMargin = this.hexSize/40;

  boardWidth = this.width + this.hexSize;
  boardHeight = this.height + this.hexSize;

  ngOnInit() {
    const hexbin = d3hex.hexbin()
      .extent([[0, 0], [this.hexSize, this.height]])
      .radius(this.hexSize);

//    d3.select(".board").data([1, 2, 2, 3]).enter().append("p").text( d => "coucou" + d).exit().remove();

    const points: [number, number][] = d3.range(this.width/this.hexSize)
      .map( (i: number): [number, number] => [i*this.hexSize, 100]);


    const pointsX: number[] = d3.range(this.width/this.hexSize)
      .map( (i: number): number => i );
    const pointsXY: [number, number][] = pointsX.map(
    i => d3.range(this.height/this.hexSize)
        //                                              x                           y
  .map((j: number): [number,number] => [j*Math.sqrt(3)/2*this.hexSize*2+5,i*this.hexSize*3/2,])).reduce( (a,b) => a.concat(b));
    console.log(pointsXY);

    d3.select("svg")
      .style("padding", this.hexSize);

    d3.select("svg").selectAll("path")
      .data(hexbin(pointsXY))
      .enter().append("path")
      .attr("d", hexbin.hexagon(this.hexSize-this.hexMargin))
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")rotate(90)"; })
      .attr("stroke", "gray")
      .attr("stroke-width", "0.5px")
      .attr("fill", "blue");

    d3.select("svg").selectAll("circle")
      .data(pointsXY).enter()
      .append("circle")
      .attr("cx", function (d) { return d[0]; })
      .attr("cy", function (d) { return d[1]; })
      .attr("r", "2px")
      .attr("fill", "red")
  }


}
