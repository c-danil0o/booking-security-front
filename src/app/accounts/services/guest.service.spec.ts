import {TestBed} from '@angular/core/testing';

import {GuestService} from './guest.service';
import {HostService} from "./host.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {editedHost, mockHost2} from "../../mocks/host.service.mock";
import {environment} from "../../../env/env";
import {editedGuest, mockGuest2} from "../../mocks/guest.service.mock";

describe('GuestService', () => {
  let service: GuestService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GuestService);
    httpController = TestBed.inject(HttpTestingController);
  });


  it('should create an instance', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });

  it('should call findById and return a guest identified by that id', () => {
    const id = 1;

    service.findById(id).subscribe(guest => {
      expect(guest).toEqual(mockGuest2);
    });
    const request = httpController.expectOne({
      method: 'GET',
      url: environment.apiHost + 'api/hosts/' + id
    });

    request.flush(mockHost2);
  });

  it('should call update and return updated guest from server', () => {
    service.update(editedGuest).subscribe((updatedHost) => {
      expect(updatedHost).toEqual(editedGuest);
    });
    const request = httpController.expectOne({
      method: 'PUT',
      url: environment.apiHost + 'api/guests/update',
    });

    request.flush(editedGuest);
  })
});
