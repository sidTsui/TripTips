import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { Room } from '../../../../models/room.interface';
import { ChatService } from '../../../../services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() chatRoom!: Room;
  @ViewChild('messages') private messagesScroller!: ElementRef;

  messagesPaginate$: Observable<any[]> = of([]);
  pageSize = 10; // Assuming each page displays 10 messages
  display: FormControl = new FormControl('', Validators.required);
  selectedFile: ImageSnippet = null as unknown as ImageSnippet;
  imageUploaded: boolean = false;
  uploadFile: boolean = false;
  chatMessage: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(): void {
    if (this.chatRoom) {
      this.fetchMessages();
    }
  }

  ngOnInit() {
    this.fetchMessages();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.chatMessage.valid) {
      this.chatService.sendMessage(this.chatRoom!.id, this.chatMessage.value);
      this.chatMessage.reset();
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.messagesScroller.nativeElement.scrollTop = this.messagesScroller.nativeElement.scrollHeight;
      } catch (err) {
        throw new Error('Error scrolling to bottom');
      }
    });
  }

  fileInput() {
    this.uploadFile = true;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageUploaded = true;
    });

    reader.readAsDataURL(file);
  }

  fetchMessages() {
    this.chatService.getMessages(this.chatRoom.id).subscribe((messages) => {
      this.messagesPaginate$ = of(messages);
      this.cdr.detectChanges();
      this.scrollToBottom();
    });
  }
}

class ImageSnippet {
  constructor(
    public src: string,
    public file: File,
  ) {}
}
