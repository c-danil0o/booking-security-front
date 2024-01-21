import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountComponent } from './edit-account.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MessageService} from "primeng/api";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {Host} from "../../model/host-model";
import {mockHost2} from "../../mocks/host.service.mock";
import {HostService} from "../services/host.service";
import {of} from "rxjs";
import {mockGuest2} from "../../mocks/guest.service.mock";
import {Guest} from "../../model/guest-model";
import {GuestService} from "../services/guest.service";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";

describe('EditAccountComponent', () => {
  let component: EditAccountComponent;
  let fixture: ComponentFixture<EditAccountComponent>;
  let hostServiceSpy: any;

  beforeEach(() => {
    const fakeHost: Host = mockHost2;
    hostServiceSpy = jasmine.createSpyObj<HostService>(['findById', 'update']);
    hostServiceSpy.findById.and.returnValue(of(fakeHost));
    const fakeGuest: Guest = mockGuest2;
    const guestServiceSpy = jasmine.createSpyObj<GuestService>(['findById', 'update']);
    guestServiceSpy.findById.and.returnValue(of(fakeGuest));

    TestBed.configureTestingModule({
      declarations: [EditAccountComponent],
      imports: [HttpClientModule, RouterTestingModule, PasswordModule, FormsModule, ReactiveFormsModule],
      providers: [MessageService, {provide: HostService, useValue: hostServiceSpy}, {provide: GuestService, useValue: guestServiceSpy}, {provide: AuthService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from host service', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getRole').and.returnValue('ROLE_Host');
    fixture.detectChanges();
    expect(component.account).toEqual(mockHost2);
    expect(component.loaded).toBeTruthy();

    expect(component.editAccountForm.value.firstname).toEqual(mockHost2.firstName);
    expect(component.editAccountForm.value.lastname).toEqual(mockHost2.lastName);
    expect(component.editAccountForm.value.phone).toEqual(mockHost2.phone);
    expect(component.editAccountForm.value.street).toEqual(mockHost2.address.street);
    expect(component.editAccountForm.value.city).toEqual(mockHost2.address.city);
    expect(component.editAccountForm.value.number).toEqual(mockHost2.address.number);
    expect(component.editAccountForm.value.country).toEqual(mockHost2.address.country);
    expect(component.editAccountForm.controls['email'].value).toEqual(mockHost2.email);
  })

  it('should get data from guest service', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getRole').and.returnValue('ROLE_Guest');
    fixture.detectChanges();
    expect(component.account).toEqual(mockGuest2);
    expect(component.loaded).toBeTruthy();

    expect(component.editAccountForm.value.firstname).toEqual(mockGuest2.firstName);
    expect(component.editAccountForm.value.lastname).toEqual(mockGuest2.lastName);
    expect(component.editAccountForm.value.phone).toEqual(mockGuest2.phone);
    expect(component.editAccountForm.value.street).toEqual(mockGuest2.address.street);
    expect(component.editAccountForm.value.city).toEqual(mockGuest2.address.city);
    expect(component.editAccountForm.value.number).toEqual(mockGuest2.address.number);
    expect(component.editAccountForm.value.country).toEqual(mockGuest2.address.country);
    expect(component.editAccountForm.controls['email'].value).toEqual(mockGuest2.email);
  })

  it('should disable the button when there are no changes in form', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getRole').and.returnValue('ROLE_Host');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#applyChangesButton')).nativeElement;
    expect(button.disabled).toBeTruthy()
  });

  it('should enable the button when there are  changes in form', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getRole').and.returnValue('ROLE_Host');
    fixture.detectChanges();
    component.editAccountForm.patchValue({firstname: 'editedname'});
    const button = fixture.debugElement.query(By.css('#applyChangesButton')).nativeElement;
    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();
  });

  it('form should be valid on initial load', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getRole').and.returnValue('ROLE_Host');
    fixture.detectChanges();
    expect(component.editAccountForm.valid).toBeTruthy();
  })

  it('form should be invalid when one field is missing', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getRole').and.returnValue('ROLE_Host');
    fixture.detectChanges();
    component.editAccountForm.patchValue({phone: ''})
    fixture.detectChanges();
    expect(component.editAccountForm.valid).toBeFalsy();
  })

  it('form should be invalid when phone is invalid format', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getRole').and.returnValue('ROLE_Host');
    fixture.detectChanges();
    component.editAccountForm.patchValue({phone: 'fasdfdf'})
    fixture.detectChanges();
    expect(component.editAccountForm.valid).toBeFalsy();
  })

  it('update service should not be called when form is invalid', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getRole').and.returnValue('ROLE_Host');
    spyOn(component, "updateAccount");
    fixture.detectChanges();
    component.editAccountForm.patchValue({phone: 'fasdfdf'})
    const button = fixture.debugElement.query(By.css('#applyChangesButton'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.editAccountForm.valid).toBeFalsy();
    expect(component.updateAccount).toHaveBeenCalledTimes(0);
  })

  it('update service should  be called when form is valid', () => {
    fixture.detectChanges();
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getRole').and.returnValue('ROLE_Host');
    spyOn(component, "updateAccount");
    spyOn(component, "onSubmit");
    component.editAccountForm.patchValue({phone: '132342234'})
    const button = fixture.debugElement.query(By.css('#applyChangesButton'));
    fixture.detectChanges();
    button.nativeElement.click();



    expect(component.onSubmit).toHaveBeenCalledTimes(1);
    expect(component.editAccountForm.valid).toBeTruthy();
    expect(component.updateAccount).toHaveBeenCalledTimes(1);
    expect(hostServiceSpy.update).toHaveBeenCalledTimes(1);
  })



});
