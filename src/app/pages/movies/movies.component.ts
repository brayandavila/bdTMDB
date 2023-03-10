import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { debounceTime, map } from 'rxjs';
import { MoviesList } from 'src/app/core/interfaces/movies-list';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  genres: any[] = [];
  form: any;
  orderObj: any;
  title: string = '';
  paginator = {
    page: 0,
    length: 0,
    pageSize: 0,
  }
  constructor(
    private _movies: MoviesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.getQueryParams();
    this.getGenres()
  }

  getGenres() {
    this._movies.getGenres().subscribe(res => {
      this.genres = res.genres;
    });
  }

  createForm() {
    this.form = this.fb.group({
      name: [null],
      section: [],
      genrer: [],
    })
    let name = this.form.get('name');
    let section = this.form.get('section');
    let genrer = this.form.get('genrer');
    name.valueChanges.pipe(debounceTime(500)).subscribe((r: any) => {
      if (r) {
        section.reset()
        this.searchMovie(r, this.page_aux)
      }
    })
    section.valueChanges.subscribe((r: any) => {
      if (r) {
        name.reset()
      }
    })
    genrer.valueChanges.subscribe((r: any) => {
      if (r) {
        name.reset();
        section.reset();
        let params = {
          with_genres: r.toString()
        }
        this.discover(params)
      }
    })
  }

  discover(params: any) {
    this._movies.discover(params).subscribe((res: any) => {
      this.movies = res.results
      this.paginator.length = res.total_results
    })
  }

  getMovies(section: any, page: number = 1) {
    switch (section) {
      case 'popular':
        this.title = 'Más populares'
        break;
      case 'now_playing':
        this.title = 'En cartelera hoy'
        break;
      case 'upcoming':
        this.title = 'Próximamente'
        break;
      case 'top_rated':
        this.title = 'Mejor valoradas'
        break;
      default:
        break;
    }
    this.setFiltros(page);
    this.paginator.page = page
    this._movies.getMovies(section, page).subscribe((res: any) => {
      this.movies = res.results
      this.paginator.length = res.total_results
    })
  }

  searchMovie(query: string, page: number = 1) {
    this.setFiltros(page);
    this.title = 'Resultados de búsqueda'
    this.paginator.page = page
    this._movies.searchMovie(query, page).subscribe((res: any) => {
      this.movies = res.results;
      this.paginator.length = res.total_results;
    })
  }
  page_aux: any;
  getQueryParams() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.page_aux = params.params.pag
      if (params.params.name) {
        this.form.patchValue({
          name: params.params.name,
        })
        if (params.params.pag) {
          this.searchMovie(params.params.name, params.params.pag);
        } else {
          this.searchMovie(params.params.name)
        }
      } else {
        this.form.patchValue({
          section: params.params.section || 'popular'
        })
        if (params.params.pag) {
          this.getMovies(this.form.get('section').value, params.params.pag);
        } else {
          this.getMovies(this.form.get('section').value)
        }
      }
    })
  }

  setFiltros(page: number) {
    let params = new HttpParams;
    params = params.set('pag', page)
    for (const controlName in this.form.controls) {
      const control = this.form.get(controlName);
      if (control.value) {
        params = params.set(controlName, control.value);
      }
    }
    let routePath = this.route.snapshot.url.map(segment => segment.path).join('/');
    this.location.replaceState(routePath, params.toString());
    return params;
  }



  handlePageEvent(e: PageEvent) {
    if (this.form.get('section').value) {
      this.getMovies(this.form.get('section').value, e.pageIndex + 1)
    } else {
      this.searchMovie(this.form.get('name').value, e.pageIndex + 1)
    }
  }


  getImagePath(path: string): string {
    if (typeof path === 'undefined' || path === null) {
      return 'assets/img/noimage.png';
    } else {
      return 'https://image.tmdb.org/t/p/w500' + path;
    }
  }

}
