import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SearchModel} from "../model/search-model";

@Injectable({
  providedIn: 'root'
})
export class SearchFormService {
  private new_search_form$ = new BehaviorSubject<any>({});
  sharedForms$ = this.new_search_form$.asObservable();

  setForms(forms: SearchModel){
    this.new_search_form$.next(forms);
  }
}
