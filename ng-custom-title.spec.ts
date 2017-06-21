import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgCustomTitleComponent } from './ng-custom-title.component';

describe('Component: NgCustomTitleComponent', () => {
  let component: NgCustomTitleComponent;
  let fixture: ComponentFixture<NgCustomTitleComponent>;

  const $event = {
    keyCode: 13, // RETURN
    target: {
      value: 'Wesley Safadão!',
      selectionEnd: 15
    },
    preventDefault: () => true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: [NgCustomTitleComponent],
      providers: [ ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgCustomTitleComponent);
    component = fixture.componentInstance;

    component.textareaField = {
      nativeElement: {
        focus : () => {}
      }
    };
  });

  describe('#startEdition', () => {
    it('should go to edition mode', () => {
      component.startEdition();
      expect(component.isEditing).toBe(true);
    });

    it('should save the `titleBackup`', () => {
      expect(component.titleBackup).toBe(undefined);
      component.title = 'bafo';
      component.startEdition();
      expect(component.titleBackup).toBe('bafo');
    });
  });

  describe('#keyActions', () => {
    it('should allow saving the changes when `return` key is pressed and there is a valid title', () => {
      component.title = 'Wesley Safadão!';
      component.keyActions($event);

      expect(component.isInvalid).toBe(false);
    });

    it('should not allow saving the changes when `return` key is pressed and the title is empty', () => {
      component.title = '';
      component.keyActions($event);

      expect(component.isInvalid).toBe(true);
    });
  });

  describe('#doneEdition', () => {
    describe('valid', () => {
      beforeEach(() => {
        component.title = 'Wesley Safadão!';
      });

      it('should set the `isInvalid` flag', () => {
        component.doneEdition();
        expect(component.isInvalid).toBe(false);
      });

      it('should emit the change of the title', fakeAsync(() => {
        spyOn(component.change, 'emit');
        component.doneEdition();
        tick(100);
        expect(component.change.emit).toHaveBeenCalledWith('Wesley Safadão!');
      }));
    });

    describe('invalid', () => {
      it('should set the `isInvalid` flag as true for empty titles', () => {
        component.title = '';
        component.doneEdition();
        expect(component.isInvalid).toBe(true);
      });
    });
  });

});