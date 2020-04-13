import { Component, OnInit } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

export interface EditorJsData {
  time: number;
  blocks: {
    type: string;
    data: {
      text?: string;
      level?: number;
      style?: string;
      items?: string[];
      file?: {
        url: string;
      };
      caption?: string;
      withBorder?: boolean;
      stretched?: boolean;
      withBackground?: boolean;
    };
  }[];
  version: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public url: string = '/single-product-details.php';
  public productDetails = [];
  public EditorJsJson: EditorJsData;
  public productName: string = null;
  public productImage: string = null;

  constructor(
    private httpService: HttpService,
    private apiHostService: ApiHostService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      this.httpService
        .getHttp(this.apiHostService.concatUrl(`${this.url}?id=${id}`))
        .subscribe((response: { results: any }) => {
          this.EditorJsJson = response.results[0].body;
          this.productName = response.results[0].name;
          this.productImage = response.results[0].image;
        });
    });
  }

  exportJsonToHTML(): string {
    let html = '';
    this.EditorJsJson.blocks.forEach((block) => {
      switch (block.type) {
        case 'header':
          html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
          break;
        case 'paragraph':
          html += `<p>${block.data.text}</p>`;
          break;
        case 'image':
          html += `<figure><img class="img-fluid" src="${block.data.file.url}"
          title="${block.data.caption}" /><figcaption>${block.data.caption}</<figcaption></figure>`;
          break;
        case 'list':
          html += '<ul>';
          block.data.items.forEach((li) => {
            html += `<li>${li}</li>`;
          });
          html += '</ul>';
          break;
        case 'delimiter':
          html += '<div class="delimiter"></div>';
          break;
        default:
          console.log('Unknown block type', block.type);
          break;
      }
    });
    return html;
  }
  goBack() {
    this.location.back();
  }
}
