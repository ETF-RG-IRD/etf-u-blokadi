import { TestBed } from '@angular/core/testing';

import { NewsBotService } from './news-bot.service';

describe('NewsBotService', () => {
  let service: NewsBotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsBotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
