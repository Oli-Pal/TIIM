import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentResponse } from '../_models/commentResponse';
import { PhotoResponse } from '../_models/photoResponse';
import { UserDetailResponse } from '../_models/userDetailResponse';
import { CommentService } from '../_services/comment.service';
import { PhotoLikeService } from '../_services/photoLike.service';
import { MatListModule } from '@angular/material/list';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() photo: PhotoResponse;
  @Input() comment: CommentResponse;
  @Input() user: UserDetailResponse;
  loggedUser: UserDetailResponse;
  isLiked: boolean;
  isCommentClicked: boolean;
  likers: any[] = [];
  comments: any[] = [];
  users: any[] = [];
  commentInput = new FormControl();
  content: string;

  constructor(
    private router: Router,
    private photoLikeService: PhotoLikeService,
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) {
    this.commentInput.valueChanges.subscribe(() => {
      this.content = this.commentInput.value;
    });
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user-info'));
    this.checkIfPhotoIsLiked(this.photo.id, this.loggedUser.id);
    this.getLikes();
    this.getComments();
  }

  public navigateToProfile(id: string) {
    this.router.navigateByUrl(`/profile/${id}`);
  }

  public checkIfPhotoIsLiked(photoId: string, userId: string) {
    this.photoLikeService.isPhotoLiked(photoId, userId).subscribe((data) => {
      this.isLiked = data.isTrue;
    });
  }

  public likePhoto() {
    this.photoLikeService.addLike(this.photo.id).subscribe(
      () => {
        this.isLiked = true;
        this.getLikes();
      },
      (error) => {
        this.snackBar.open(error, '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  public dislikePhoto() {
    this.photoLikeService.removeLike(this.photo.id).subscribe(
      () => {
        this.isLiked = false;
        this.getLikes();
      },
      (error) => {
        this.snackBar.open(error, '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  public getLikes() {
    this.photoLikeService.getLikesForPhoto(this.photo.id).subscribe((data) => {
      this.likers = data;
    });
  }

  public getComments() {
    this.commentService.getCommentsForPhoto(this.photo.id).subscribe((data) => {
      this.comments = data;
    });
  }

  public clickComment() {
    this.isCommentClicked = true;
    this.getComments();
  }

  public unclickComment() {
    this.isCommentClicked = false;
    this.getComments();
  }

  public addComment() {
    this.commentService.addComment(this.photo.id, this.content).subscribe(
      () => {
        this.getComments();
      },
      (error) => {
        this.snackBar.open(error, '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  public removeComment(commentId: string) {
    this.commentService.removeComment(commentId).subscribe(
      () => {
        this.getComments();
      },
      (error) => {
        this.snackBar.open(error, '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
