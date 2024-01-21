import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });


  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it ('should get role for logged user and return host', () => {
    localStorage.setItem('user', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob3N0MkBleGFtcGxlLmNvbSIsInJvbGUiOlt7ImF1dGhvcml0eSI6IlJPTEVfSG9zdCJ9XSwiaWQiOjIsImV4cCI6MTcwNTc4Nzg3MSwiaWF0IjoxNzA1NzY5ODcwfQ.35A_S6B0TAGqJEipxbBXNSjrqqer3Ab1zk856KQTYOIn9UFg35Rv_nOGdqdhKDxuy_UK0PE7pJIWzqY5ah3WDA')
    expect(service.getRole()).toBe("ROLE_Host")
  })

  it ('should get null because no user is logged in', () => {
    //localStorage.setItem('user', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob3N0MkBleGFtcGxlLmNvbSIsInJvbGUiOlt7ImF1dGhvcml0eSI6IlJPTEVfSG9zdCJ9XSwiaWQiOjIsImV4cCI6MTcwNTc4Nzg3MSwiaWF0IjoxNzA1NzY5ODcwfQ.35A_S6B0TAGqJEipxbBXNSjrqqer3Ab1zk856KQTYOIn9UFg35Rv_nOGdqdhKDxuy_UK0PE7pJIWzqY5ah3WDA')
    localStorage.removeItem('user')
    expect(service.getRole()).toBe(null)
  })





});
