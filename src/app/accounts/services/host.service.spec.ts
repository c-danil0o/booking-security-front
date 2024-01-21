import { HostService } from './host.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {environment} from "../../../env/env";
import {editedHost, mockHost2} from "../../mocks/host.service.mock";

describe('HostService', () => {
  let service: HostService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service= TestBed.inject(HostService);
    httpController = TestBed.inject(HttpTestingController);
  });


  it('should create an instance', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });

  it('should call findById and return a host identified by that id', () => {
    const id = 2;

    service.findById(id).subscribe(host => {
      expect(host).toEqual(mockHost2);
    });
    const request = httpController.expectOne({
      method: 'GET',
      url: environment.apiHost + 'api/hosts/' + id
    });
    request.flush(mockHost2);
  });

  it('should call update and return updated host from server', () => {
    service.update(editedHost).subscribe((updatedHost) => {
      expect(updatedHost).toEqual(editedHost);
    });
    const request = httpController.expectOne({
      method: 'PUT',
      url: environment.apiHost + 'api/hosts/update',
    });

    request.flush(editedHost);
  })





});
