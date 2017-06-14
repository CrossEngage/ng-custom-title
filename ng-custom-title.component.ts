import {
  Input,
  Output,
  ViewChild,
  Component,
  EventEmitter
}  from '@angular/core';

const SPACE_KEY_CODE: number = 32;
const RETURN_KEY_CODE: number = 13;
const ESC_KEY_CODE: number = 27;

@Component({
  selector: 'ng-custom-title',
  template: './ng-custom-title.html',
  styles: ['./ng-custom-title.css'],
  host: {
    '(click)': 'startEdition()',
    '(keydown)' : 'keyActions($event)'
  }
})

export class NgCustomTitleComponent {

  @Input() title: string;
  @Input() placeholder: string;
  @Input() errorText: string;
  
  @Output('update') change = new EventEmitter<string>();

  @ViewChild('textarea') textareaField;

  titleBackup: string;
  isInvalid: boolean = false;
  isEditing: boolean = false;

  startEdition(): void {
    this.isEditing = true;
    this.titleBackup = this.title;
  }

  keyActions($event): void { 
    this.preventMultipleBlankSpaces($event);
    this.saveOnReturnKeyPress($event);
    this.cancelEditionOnEscKeyPress($event)
  }

  doneEdition(): void {
    if (this.isEditionValid())
      this.emitChanges();
  }
 
  private preventMultipleBlankSpaces($event): void {
    const currentValue = $event.target.value,
          selectionEnd = $event.target.selectionEnd;

    if (
      ($event.keyCode === SPACE_KEY_CODE && (currentValue[selectionEnd - 1] === ' ' || currentValue[selectionEnd] === ' '))
      || ($event.keyCode === SPACE_KEY_CODE && currentValue === '')
    )
      $event.preventDefault();
    else
      this.emitChanges();
  }

  private saveOnReturnKeyPress($event): void {
    if ($event.keyCode === RETURN_KEY_CODE) {
      $event.preventDefault();      
      this.doneEdition();
    }
  }

  private cancelEditionOnEscKeyPress($event): void {
    if ($event.keyCode === ESC_KEY_CODE) {
      $event.preventDefault();
      this.textareaField.nativeElement.blur();      
      this.title = this.titleBackup;
      this.doneEdition();
    }
  }

  private isEditionValid(): boolean {
    if (this.title.trim().length === 0) { // empty title
      this.isInvalid = true;
      this.textareaField.nativeElement.focus();
      return false;
    } else {
      this.isInvalid = false;
      this.isEditing = false;
      return true;      
    }
  }

  private emitChanges() {
    setTimeout(() => this.change.emit(this.title), 0);
  }

}
