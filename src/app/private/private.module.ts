import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';



import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxStarsModule } from 'ngx-stars';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ExplorePageComponent } from './components/explore-page/explore-page.component';
import { HomeComponent } from './components/home/home.component';
import { ChatDashboardComponent } from './components/messaging-components/chat-dashboard/chat-dashboard.component';
import { ChatMessageComponent } from './components/messaging-components/chat-message/chat-message.component';
import { ChatRoomComponent } from './components/messaging-components/chat-room/chat-room.component';
import { CreateRoomModalComponent } from './components/messaging-components/create-room-modal/create-room-modal.component';
import { CreatePostComponent } from './components/post-components/create-post/create-post.component';
import { DeletePostComponent } from './components/post-components/delete-post/delete-post.component';
import { EditPostComponent } from './components/post-components/edit-post/edit-post.component';
import { PostCommentComponent } from './components/post-components/post-comment/post-comment.component';
import { PostDashboardComponent } from './components/post-components/post-dashboard/post-dashboard.component';
import { PostDetailsComponent } from './components/post-components/post-details/post-details.component';
import { PostComponent } from './components/post-components/post/post.component';
import { OtherProfileComponent } from './components/user-components/other-profile/other-profile.component';
import { PasswordChangeComponent } from './components/user-components/password-change/password-change.component';
import { SettingsComponent } from './components/user-components/settings/settings.component';
import { UserListDialogComponent } from './components/user-components/user-list-dialog/user-list-dialog.component';
import { UserProfileButtonComponent } from './components/user-components/user-profile-button/user-profile-button.component';
import { UserProfileComponent } from './components/user-components/user-profile/user-profile.component';
import { UsersDashboardComponent } from './components/user-components/users-dashboard/users-dashboard.component';
import { MapBoxComponent } from './components/util-components/map-box/map-box.component';
import { SelectUsersComponent } from './components/util-components/select-users/select-users.component';
import { PrivateRoutingModule } from './private-routing.module';
@NgModule({
  declarations: [
    UserProfileButtonComponent,
    CreateRoomModalComponent,
    UserListDialogComponent,
    PasswordChangeComponent,
    UsersDashboardComponent,
    ChatDashboardComponent,
    PostDashboardComponent,
    OtherProfileComponent,
    PostCommentComponent,
    ExplorePageComponent,
    PostDetailsComponent,
    SelectUsersComponent,
    UserProfileComponent,
    ChatMessageComponent,
    DeletePostComponent,
    CreatePostComponent,
    SettingsComponent,
    ChatRoomComponent,
    ChatRoomComponent,
    EditPostComponent,
    MapBoxComponent,
    PostComponent,
    HomeComponent,
  ],
  imports: [
    MatAutocompleteModule,
    PrivateRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatGridListModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    NgxStarsModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    CdkMenuModule,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  exports: [ChatDashboardComponent, SettingsComponent],
})
export class PrivateModule {}