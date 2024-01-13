import { Routes } from "@angular/router";
import { MoviesComponent } from "./movies/movies.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";

export const routes: Routes = [
    { path: '', redirectTo: 'movie', pathMatch: 'full' },
    { path: 'movie', component: MoviesComponent, title: 'Películas' },
    { path: 'movie/:id', component: MovieDetailsComponent },
    { path: '**', redirectTo: 'movie', pathMatch: 'full' },
]