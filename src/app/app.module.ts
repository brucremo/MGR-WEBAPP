import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VideogameComponent } from './videogame/videogame.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SentEmailComponent } from './sent-email/sent-email.component';
import { PasswordChangedComponent } from './password-changed/password-changed.component';
import { NavServiceService } from './nav-service.service';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search/search.component';
import { LogOutComponent } from './log-out/log-out.component';
import { VideogameResolve } from './videogame/videogame.resolve';
import { ReviewPageComponent } from './review-page/review-page.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';
import { CollectionsComponent } from './collections/collections.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { FriendComponent } from './friend/friend.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { UsersGroupsComponent } from './users-groups/users-groups.component';

const appRoutes: Routes = [
  { path: 'user/:id', component: UserPageComponent },
  { path: 'user', component: UserPageComponent },
  {
    path: 'game/:id',
    component: VideogameComponent,
    resolve: {
      videogame: VideogameResolve
    }
  },
  { path: 'editUser/:id', component: EditUserComponent },
  { path: 'editUser', component: EditUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogOutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: ':id/reset/:guid', component: ResetPasswordComponent },
  { path: 'sentEmail', component: SentEmailComponent },
  { path: 'passwordChanged', component: PasswordChangedComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'review/:id', component:ReviewPageComponent },
  { path: 'review', component:ReviewPageComponent },
  { path: 'editReview', component: EditReviewComponent},
  { path: 'editReview/:userid/:gameid', component: EditReviewComponent},
  { path: 'userReviews/:id', component: UserReviewsComponent},
  { path: 'collection', component: CollectionsComponent},
  { path: 'collection/:id', component: CollectionsComponent},
  { path: 'favourites', component: FavouritesComponent},
  { path: 'favourites/:id', component: FavouritesComponent},
  { path: 'user/:id/friends', component: FriendComponent},
  { path: 'groups/:id', component: GroupPageComponent},
  { path: 'userGroups', component: UsersGroupsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
@NgModule({
  declarations: [
    AppComponent,
    VideogameComponent,
    NavbarComponent,
    UserPageComponent,
    EditUserComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    ResetPasswordComponent,
    SentEmailComponent,
    PasswordChangedComponent,
    HomePageComponent,
    SearchComponent,
    LogOutComponent,
    ReviewPageComponent,
    EditReviewComponent,
    UserReviewsComponent,
    CollectionsComponent,
    FavouritesComponent,
    FriendComponent,
    GroupPageComponent,
    UsersGroupsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ],
  providers: [NavServiceService, VideogameResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }