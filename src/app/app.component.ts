import { Component, OnInit } from '@angular/core';
import { PDFTS } from 'pdfjs-ts/dist';
import { searchEvent } from 'pdfjs-ts/dist/core/events/searchEvent';
import { progressEvent } from 'pdfjs-ts/dist/core/events/progressEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pdfjsapp';
  url = '/assets/test.pdf';
  constructor() {
  }
  pdf: PDFTS;
  ngOnInit() {
    console.log(PDFTS);
    // progressEvent.addEvent('search_progress', function(e: any){
    //   console.log('search progress', e.detail);
    // })
    // searchEvent.addEvent('search', (e: any) => {
    //   console.log(e.detail)
    // })
    this.pdf = new PDFTS({
      url: this.url,
      container: document.querySelector('#container'),
      multiple: true,
      workerURL: '/assets/pdfjs/pdf.worker.min.js',
      renderText: true,
      enableWebGL: true,
      searchWhenRender: 'for'
    });
    this.pdf.initial().then(async _ => {
      // const page = await this.pdf.renderer.renderPageSync(2);
      // console.log(page);
      this.pdf.renderer.render();
    });
    // pdf.renderer.render();
  }

  search() {
    console.log('sss');
    // this.pdf.findCtrl.initial();
    const result = this.pdf.findCtrl.search({
      // q: 'and'
      keywords: ['and', 'for']
    });
    console.log(result);
  }
  next() {
    this.pdf.findCtrl.renderNext();
  }
}
