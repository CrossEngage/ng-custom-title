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
  
  @Output() update = new EventEmitter<string>();

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
          selectionEnd = $event.target.selectionEnd,
          previousSelectionEnd = currentValue[selectionEnd - 1],
          currentSelectionEnd = currentValue[selectionEnd],
          keyCode = $event.keyCode;
    
    if (
      (keyCode === SPACE_KEY_CODE && (previousSelectionEnd === ' ' || currentSelectionEnd === ' '))
      || (keyCode === SPACE_KEY_CODE && currentValue === '')
    ) {
      $event.preventDefault();
    }

    setTimeout(() => {
      let elementValue = this.textareaField.nativeElement.value;
      
      while (elementValue.charAt(0) === ' ') {
        elementValue = elementValue.substr(1);
        this.textareaField.nativeElement.value = elementValue;
      }
      
      this.emitChanges();
    }, 0);
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
    setTimeout(() => this.update.emit(this.title), 0);
  }

}