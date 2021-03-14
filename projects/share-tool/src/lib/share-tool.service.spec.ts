import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ShareToolService } from './share-tool.service';

describe('ShareToolService', () => {
  let service: ShareToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
