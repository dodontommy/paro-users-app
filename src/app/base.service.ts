import { HttpClient } from '@angular/common/http';
import Serializer from './Serializer';
import BaseModel from './models/BaseModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

export default class BaseModelService<T extends BaseModel> {
constructor(
    private httpClient: HttpClient,
    private url: string,
    private endpoint: string,
    private serializer: Serializer) {}

  public create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${this.endpoint}/add`, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public update(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${this.endpoint}/${item.id}`,
        this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  read(id: number): Observable<T> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id}`)
      .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }

  list(): Observable<T[]> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}`)
      .pipe(map((data: any) => this.convertData(data)));
  }

  delete(id: number) {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id}/delete`);
  }

  private convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }
}
