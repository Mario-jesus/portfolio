import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressiveImage } from './progressive-image';

describe('ProgressiveImage', () => {
  let component: ProgressiveImage;
  let fixture: ComponentFixture<ProgressiveImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressiveImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressiveImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
