import { TestBed } from '@angular/core/testing';

import { MyGescoService } from './my-gesco.service';

describe('MyGescoService', () => {
  let service: MyGescoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGescoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
