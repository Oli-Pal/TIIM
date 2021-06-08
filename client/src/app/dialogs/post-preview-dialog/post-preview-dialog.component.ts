import { Input } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PhotoResponse } from 'src/app/_models/photoResponse';
import { UserDetailResponse } from 'src/app/_models/userDetailResponse';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-preview-dialog',
  templateUrl: './post-preview-dialog.component.html',
  styleUrls: ['./post-preview-dialog.component.css'],
})
export class PostPreviewDialogComponent implements OnInit {
  @Input() user: UserDetailResponse;
  @Input() photo: PhotoResponse;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PostPreviewDialogData,
    public dialogRef: MatDialogRef<PostPreviewDialogComponent>,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

}

export interface PostPreviewDialogData {
  photo: PhotoResponse;
  user: UserDetailResponse;
}
