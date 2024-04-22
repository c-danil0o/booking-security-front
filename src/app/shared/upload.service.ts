import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseApiUrl = "https://localhost:8080/upload"

  constructor(private http:HttpClient) { }

  // Returns an observable
  upload(file: File):Observable<any> {

    const formData = new FormData();
    formData.append("file", file);
    console.log(this.baseApiUrl)
    return this.http.post(this.baseApiUrl, formData)
  }
}
