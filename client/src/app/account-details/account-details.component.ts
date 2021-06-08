import { Message } from 'src/app/_models/message';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FollowType } from '../dialogs/user-list-dialog/user-list-dialog.component';
import { DialogHelperService } from '../_helpers/dialogHelper.service';
import { PhotoResponse } from '../_models/photoResponse';
import { UserDetailResponse } from '../_models/userDetailResponse';
import { FollowService } from '../_services/follow.service';
import { MessageService } from '../_services/message.service';
import { PhotoService } from '../_services/photo.service';
import { PresenceService } from '../_services/presence.service';
import { UserService } from '../_services/user.service';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  //temporary
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  isMine: boolean = false;
  isFollowed: boolean = false;
  user: UserDetailResponse;
  photos: PhotoResponse[];
  loggedUser: UserDetailResponse;
  messages: Message[] = [];
  activeTab: TabDirective;
  //followers
  followers: UserDetailResponse[];
  followees: UserDetailResponse[];
  mainPhotoUrl = new FormControl();
  avatarIsClicked: boolean = false;
  messageIsClicked: boolean = false;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private followService: FollowService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogHelper: DialogHelperService,
    private presence: PresenceService,
    private messageService: MessageService
  ) {
    this.mainPhotoUrl.valueChanges.subscribe(() => {
      this.user.mainPhotoUrl = this.mainPhotoUrl.value;
    });
  }

  ngOnInit(): void {
    //temporary
    this.initializeArrays();
    this.loggedUser = JSON.parse(localStorage.getItem('user-info'));
    this.presence.createHubConnection(this.loggedUser)
    this.route.data.subscribe((data) => {
      this.checkIfProfileIsMine(data);
      this.getFollowers();
      this.getFollowees();
      this.checkIfUserHasBeenAlreadyFollowed();
      this.loadPhotos();
    });
  }

  public follow() {
    this.followService.addFollow(this.user.id).subscribe(
      () => {
        this.snackBar.open(`You followed ${this.user.userName}!`, 'Ok', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.getFollowees();
        this.getFollowers();
      },
      (error) => {
        this.snackBar.open(error);
      }
    );
  }

  public unfollow() {
    this.followService.removeFollow(this.user.id).subscribe(
      () => {
        this.snackBar.open(`You unfollowed ${this.user.userName}!`, 'Ok', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.getFollowees();
        this.getFollowers();
      },
      (error) => {
        this.snackBar.open(error);
      }
    );
  }

  public openFolloweesDialog() {
    this.dialogHelper.openUsersListDialog(this.followees, FollowType.followees);
  }

  public openFollowersDialog() {
    this.dialogHelper.openUsersListDialog(this.followers, FollowType.followers);
  }

  public openPostPreviewDialog(photo: PhotoResponse) {
    this.dialogHelper.openPostPreviewDialog(photo);
  }

  private checkIfUserHasBeenAlreadyFollowed() {
    this.followService.getSingle(this.loggedUser.id, this.user.id).subscribe(
      (data) => {
        this.isFollowed = data.isTrue;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getFollowers() {
    this.followService.getFollowers(this.user.id).subscribe(
      (data) => {
        this.followers = data;
        this.checkIfUserHasBeenAlreadyFollowed();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getFollowees() {
    this.followService.getFollowees(this.user.id).subscribe(
      (data) => {
        this.followees = data;
        this.checkIfUserHasBeenAlreadyFollowed();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private initializeArrays() {
    this.photos = [];
    this.followees = [];
    this.followers = [];
  }

  private checkIfProfileIsMine(data: any) {
    this.loggedUser = JSON.parse(localStorage.getItem('user-info'));
    this.user = data['user'];
    if (this.loggedUser.id == this.user.id) {
      this.isMine = true;
    } else {
      this.isMine = false;
    }
  }

  private loadPhotos() {
    this.photoService.getPhotosForUser(this.user.id).subscribe(
      (photos) => {
        this.photos = photos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public clickAvatar() {
    if ((this.avatarIsClicked == false)) {
      this.avatarIsClicked = true;
    } else {
      this.avatarIsClicked = false;
    }
  }

  loadMessages() {
    this.messageService.getMessageThread(this.user.userName).subscribe(messages => {
      this.messages = messages;
    })
  }
  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.messageService.createHubConnection(this.loggedUser, this.user.userName);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  newMessageClicked() {
    if ((this.messageIsClicked == false)) {
      this.messageIsClicked = true;
    } else {
      this.messageIsClicked = false;
    }
  }

}
