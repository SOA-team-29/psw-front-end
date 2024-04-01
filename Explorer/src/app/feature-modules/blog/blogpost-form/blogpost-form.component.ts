import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../blog.service';
import { BlogPost } from '../model/blogpost.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { Equipment } from '../../tour-authoring/tour/model/equipment.model';
import { Tour } from '../../tour-authoring/tour/model/tour.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourEquipmentService } from '../../tour-authoring/tour_equipment.service';
import { AdministrationService } from '../../administration/administration.service';

@Component({
  selector: 'xp-blogpost-form',
  templateUrl: './blogpost-form.component.html',
  styleUrls: ['./blogpost-form.component.css']
})



export class BlogpostFormComponent implements OnChanges,OnInit {
  
  @Output() blogPostsUpdated = new EventEmitter<null>();
  @Input() blogPost: BlogPost;
  @Input() shouldEdit: boolean = false;
  @Input() shouldEditDraft: boolean = false;
  
  tour:Tour;
    tourId:number;
    


  constructor(private a: AdministrationService,private formBuilder: FormBuilder,private tourService:TourAuthoringService,private service: BlogService, private tokenStorage: TokenStorage, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tourId = params['id']; 
      console.log('ID ture:', this.tourId);
      
      
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.blogPostForm.reset();
    if(this.shouldEdit){
      this.blogPostForm.patchValue({title: this.blogPost.title || '',
      description: this.blogPost.description || '',
      imageURLs: this.blogPost.imageURLs?.join(', ')});
    }
  }

  blogPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageURLs: new FormControl(''),
    
  })


  addBlogPost(): void{
    console.log(this.blogPostForm.value)

    const imageURLsString = this.blogPostForm.value.imageURLs;
    const imageURLs = imageURLsString
      ? imageURLsString.split(',').map(url => String(url.trim()))
      : [];


    const blogPost = {
      id: 0,
      authorId: this.tokenStorage.getUserId() || 0,
      tourId:this.tourId,
      title: this.blogPostForm.value.title || '',
      description: this.blogPostForm.value.description || '',
      creationDate: new Date(),
      imageURLs: imageURLs,
      comments: [],
      ratings: [],
      status: 'PUBLISHED'
    }
    
 
    this.service.addBlogPost(blogPost).subscribe({
      next: (_) => {
        this.blogPostsUpdated.emit();
        if(this.tourId === 0){
          this.router.navigate(['/blog'])
        }else{
          this.router.navigate(['/blog']);

        }
      }
    });
    
    
  }


  addBlogPostDraft(): void{
    console.log(this.blogPostForm.value)

    const imageURLsString = this.blogPostForm.value.imageURLs;
    const imageURLs = imageURLsString
      ? imageURLsString.split(',').map(url => String(url.trim()))
      : [];


    const blogPost = {
      id: 0,
      authorId: this.tokenStorage.getUserId() || 0,
      tourId:0,
      authorUsername: null,
      title: this.blogPostForm.value.title || '',
      description: this.blogPostForm.value.description || '',
      creationDate: new Date(),
      imageURLs: imageURLs,
      comments: [],
      ratings: [],
      status: 'DRAFT'
    }

    this.service.addBlogPost(blogPost).subscribe({
      next: (_) => {
        this.blogPostsUpdated.emit();
      }
    });

    this.blogPostForm.reset();
    
  }

  postBlogPostDraft(): void{
    console.log(this.blogPostForm.value)

    const imageURLsString = this.blogPostForm.value.imageURLs;
    const imageURLs = imageURLsString
      ? imageURLsString.split(',').map(url => String(url.trim()))
      : [];


      const blogPost = {
        id: this.blogPost.id,
        authorId: this.blogPost.authorId,
        tourId:0,
        title: this.blogPostForm.value.title || '',
        description: this.blogPostForm.value.description || '',
        creationDate: new Date(),
        imageURLs: imageURLs,
        comments: this.blogPost.comments,
        ratings: this.blogPost.ratings,
        status: 'PUBLISHED'
      }

    this.service.updateBlogPost(blogPost).subscribe({
      next: (_) => {
        this.blogPostsUpdated.emit();
        this.router.navigate(['/blog']);
      }
    });

    
    
  }

  updateBlogPost(): void{

    const imageURLsString = this.blogPostForm.value.imageURLs;
    const imageURLs = imageURLsString
      ? imageURLsString.split(',').map(url => String(url.trim()))
      : [];

    const blogPost = {
      id: this.blogPost.id,
      authorId: this.blogPost.authorId,
      tourId:0,
      
      title: this.blogPostForm.value.title || '',
      description: this.blogPostForm.value.description || '',
      creationDate: this.blogPost.creationDate,
      imageURLs: imageURLs,
      comments: this.blogPost.comments,
      ratings: this.blogPost.ratings,
      status: this.blogPost.status
    }

    this.service.updateBlogPost(blogPost).subscribe({
      next: (_) => {
        this.blogPostsUpdated.emit()
        if(!this.shouldEditDraft) {
          this.router.navigate(['/blog/',this.blogPost.id]);
        }
        else {
          this.router.navigate(['/blog/create-post']);
        }
      }
    })
    

  }

  


  


    
}
