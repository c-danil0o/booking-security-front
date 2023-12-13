import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private new_accommodation_form$ = new BehaviorSubject<any>({});
  sharedForms$ = this.new_accommodation_form$.asObservable();

  setForms(forms: any){
    this.new_accommodation_form$.next(forms);
  }
}
