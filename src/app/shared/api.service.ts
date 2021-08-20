import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Software } from '../app.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getSoftwares(): Observable<Software[]> {
    return this.http.get<Software[]>('http://localhost:8080/Softwares/liste');
  }

  public addSoftware(software: Software): Observable<Software> {
    return this.http.post<Software>('http://localhost:8080/Softwares/ajouter', software);
  }

  
  public updateSoftware(software: Software): Observable<Software> {
    return this.http.put<Software>('http://localhost:8080/Softwares/modifier', software);
  }
  

  public deleteSoftware(softwareId: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/Softwares/supprimer/'+softwareId);
  }


}
