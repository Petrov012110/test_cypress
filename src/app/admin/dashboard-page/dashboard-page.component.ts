import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../shared/interfaces';
import { PostsService } from '../../shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  constructor(
    private PostsService: PostsService,
    private alert: AlertService
    ) { }

  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription
  searchStr = ''
  
  ngOnInit() {
    this.pSub = this.PostsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  
  remove(id:string) {
    this.dSub = this.PostsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Пост был удален')
    })
  }
  
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if(this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
