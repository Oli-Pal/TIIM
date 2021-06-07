import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = environment.api + 'comment'

  constructor(private http: HttpClient) {}


  public addComment(photoId: string, content: string) { //spr
    return this.http.post(this.url, 
    {
      photoId: photoId,
      content: content
    });
  }

  public removeComment(commentId: string) {
    return this.http.delete(`${this.url}?Id=${commentId}`);
  }

  public getCommentsForPhoto(photoId: string) {
    return this.http.get<any[]>(`${this.url}/${photoId}`);
  }
}
