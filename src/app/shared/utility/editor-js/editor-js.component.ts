import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges
} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import RawTool from '@editorjs/raw';
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Personality from '@editorjs/personality';
import Table from '@editorjs/table';
import AttachesTool from '@editorjs/attaches';
import Paragraph from '@editorjs/paragraph';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';

@Component({
  selector: 'app-editor-js',
  templateUrl: './editor-js.component.html',
  styleUrls: ['./editor-js.component.scss']
})
export class EditorJsComponent implements OnInit {
  @Input() editorData: { time: number; blocks: []; version: string };
  @Output() private sendEditorData: EventEmitter<{}> = new EventEmitter<{}>();

  private editor;
  constructor() {}
  ngOnInit() {
    this.editor = new EditorJS({
      holder: 'editorjs',
      placeholder: 'Let`s write an awesome story!',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M'
        },
        embed: Embed,
        quote: Quote,
        raw: RawTool,
        personality: {
          class: Personality,
          config: {
            endpoint: 'upload-image.php', // Your backend file uploader endpoint
            types: 'image/png, image/jpg, image/bmp'
          }
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3
          }
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile:
                'http://localhost/angular-v8/uidhtml-v8/api/upload-image.php', // Your backend file uploader endpoint
              byUrl: 'http://localhost:8000/fetchUrl' // Your endpoint that provides uploading by Url
            },
            types: 'image/png, image/jpg, image/jpeg, image/bmp'
          }
        },
        attaches: {
          class: AttachesTool,
          config: {
            endpoint: 'http://localhost:8000/uploadFile',
            types: 'application/zip'
          }
        }
      },
      onReady: () => {
        console.log('Editor.js is ready to work!');
      },
      onChange: () => {
        this.editor
          .save()
          .then(outputData => {
            this.sendEditorData.emit(outputData);
          })
          .catch(error => {
            console.log('Saving failed: ', error);
          });
      },
      data: this.editorData
    });
  }
}
