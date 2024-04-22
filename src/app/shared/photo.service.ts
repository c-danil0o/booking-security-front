import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseApiUrl = "https://localhost:8080/files/"

  constructor(private http:HttpClient) { }

  // Returns an observable
  getImage(name: string):Observable<Blob> {
    return this.http.get(this.baseApiUrl + name, {responseType: 'blob'})
  }
}
