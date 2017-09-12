import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    d3.select(".board").data([1, 2, 2, 3]).enter().append("p").text( d => "coucou" + d).exit().remove();
  }

}
