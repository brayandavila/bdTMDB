import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
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
  loading: boolean = false;
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
    this.onResize();
    this.createForm();
    this.getQueryParams();
    this.getGenres();
  }

  filters_search: boolean = true;
  filters_section: boolean = true;
  filters_genres: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 992) {
      this.filters_search = false;
      this.filters_section = false;
      this.filters_genres = false;
    } else {
      this.filters_search = true;
      this.filters_section = true;
      this.filters_genres = true;
    }
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
        section.reset();
        genrer.reset();
        this.searchMovie(r, this.page_aux)
      }
    })
    section.valueChanges.subscribe((r: any) => {
      if (r) {
        name.reset();
        genrer.reset();
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

  discover(params: any, page = 1) {
    this.title = 'Por géneros'
    this.loading = true;
    this.setFiltros(page);
    this.paginator.page = page
    this._movies.discover(params, page).subscribe((res: any) => {
      this.movies = res.results;
      this.paginator.length = res.total_results;
      this.loading = false;
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
    this.loading = true;
    this.setFiltros(page);
    this.paginator.page = page
    this._movies.getMovies(section, page).subscribe((res: any) => {
      this.movies = res.results
      this.paginator.length = res.total_results
      this.loading = false;
    })
  }

  searchMovie(query: string, page: number = 1) {
    this.loading = true;
    this.setFiltros(page);
    this.title = 'Resultados de búsqueda'
    this.paginator.page = page
    this._movies.searchMovie(query, page).subscribe((res: any) => {
      this.movies = res.results;
      this.paginator.length = res.total_results;
      this.loading = false;
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
      } else if (params.params.section) {
        this.form.patchValue({
          section: params.params.section || 'popular'
        })
        if (params.params.pag) {
          this.getMovies(this.form.get('section').value, params.params.pag);
        } else {
          this.getMovies(this.form.get('section').value)
        }
      } else if (params.params.genrer) {
        const arr = params.params.genrer.split(",").map((x: any) => Number(x));
        this.form.patchValue({
          genrer: arr
        })
        let params_genrer = {
          with_genres: this.form.get('genrer').value.toString()
        }
        if (params.params.pag) {
          this.discover(params_genrer, params.params.pag);
        } else {
          this.discover(params_genrer)
        }
      } else {
        this.form.patchValue({
          section: 'popular'
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
    } else if (this.form.get('name').value) {
      this.searchMovie(this.form.get('name').value, e.pageIndex + 1)
    } else if (this.form.get('genrer').value) {
      let params_genrer = {
        with_genres: this.form.get('genrer').value.toString()
      }
      this.discover(params_genrer, e.pageIndex + 1)
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
