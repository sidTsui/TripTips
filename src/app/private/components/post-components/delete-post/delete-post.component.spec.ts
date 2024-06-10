import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



import { DeletePostComponent } from './delete-post.component';


describe('DeletePostComponent', () => {
  let component: DeletePostComponent;
  let fixture: ComponentFixture<DeletePostComponent>;

  beforeEach(async () => {
    let data: any = {};

    await TestBed.configureTestingModule({
      declarations: [DeletePostComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn(),
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete', () => {
    component.confirmDelete();
  });

  it('should cancel', () => {
    component.cancelDelete();
  });
});