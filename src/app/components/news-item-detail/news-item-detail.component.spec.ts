import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsItemDetailComponent} from './news-item-detail.component';

describe('NewsItemDetailComponent', () => {
  let component: NewsItemDetailComponent;
  let fixture: ComponentFixture<NewsItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsItemDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
