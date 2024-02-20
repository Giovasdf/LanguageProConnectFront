import { TestBed } from '@angular/core/testing';

import { LanguageSpokenService } from './language-spoken.service';

describe('LanguageSpokenService', () => {
  let service: LanguageSpokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageSpokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
