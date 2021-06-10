import { Input } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PhotoResponse } from 'src/app/_models/photoResponse';
import { UserDetailResponse } from 'src/app/_models/userDetailResponse';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { CommentResponse } from 'src/app/_models/commentResponse';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-post-preview-dialog',
  templateUrl: './post-preview-dialog.component.html',
  styleUrls: ['./post-preview-dialog.component.css'],
})
export class PostPreviewDialogComponent implements OnInit {
  @Input() user: UserDetailResponse;
  @Input() photo: PhotoResponse;
  @Input() comment: CommentResponse;
  comments: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PostPreviewDialogData,
    public dialogRef: MatDialogRef<PostPreviewDialogComponent>,
    private router: Router,
    private userService: UserService,
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getComments();
  }

  public getComments() {
    this.commentService.getCommentsForPhoto(this.data.photo.id).subscribe((data) => {
      this.comments = data;
    });
  }
}

export interface PostPreviewDialogData {
  photo: PhotoResponse;
  user: UserDetailResponse;
  comment: CommentResponse;
}
