import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "@core/services/auth.service";
import { CoreService } from "@core/services/core.service";
import { EnviromentService } from "@core/services/enviroment.service";
import { environment } from 'environments/environment';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UploadService extends CoreService{
    private envService = inject(EnviromentService);
    private apiURL = this.envService.getUrl() + "upload/"
    constructor(private http: HttpClient) {
        super()
    }

    private transformFormData(files: File[]): FormData {
        let formImage = new FormData();
        files.forEach((file) => {
            formImage.append('imagens', file)
        })
        return formImage
    }
    public postUpload(files: File[]): Observable<string[]> {
        let formImage = this.transformFormData(files);
        let headers:HttpHeaders = this.setHeader();
        return this.http.post<string[]>(this.apiURL, formImage, {headers});
    }
    public deleteUpload(filesNames: string[]):Observable<string> {
        let headers:HttpHeaders = this.setHeader();
        return this.http.post<string>(this.apiURL, filesNames, {headers})
    }
}