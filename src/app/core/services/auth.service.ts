import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, firstValueFrom, Observable, switchMap, tap } from 'rxjs';
import { IUser, IUserCredentials } from '@features/usuario/models/user.model';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from 'environments/environment';
import { AuthTokenStorageService } from '@core/auth/services/auth-token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = environment.domain + 'auth';

  private currentUserSignal = signal<IUser | null>(null);
  public currentUser = this.currentUserSignal.asReadonly();
  public isAuthReady = signal(false); 

  public isLoggedIn = computed(() => !!this.currentUser()); 
  public isAdmin = computed(() => this.currentUser()?.nivel === 1); 

  constructor( 
    private httpClient: HttpClient,
    private sweetAlertService: SweetAlertService,
    private authTokenStorageService : AuthTokenStorageService,
    private errorService : ErrorHandlerService){
  }

  public async initializeAuth(): Promise<void> {
    const token = this.authTokenStorageService.get();
    
    if (token) {
      try {
        await firstValueFrom(this.fetchUser());
      } catch (error) {
        this.logout();
      }
    }
    this.isAuthReady.set(true);
  }

  /* Gera o token JWT para login */
  public login(userCredentials : IUserCredentials) {
    return this.httpClient.post<string>(`${this.API_URL}/login`, userCredentials).pipe(
      tap((token) => this.authTokenStorageService.set(token)),
      switchMap(() => this.fetchUser()),
      tap(() => this.sweetAlertService.confirmLogin()),
      catchError(err => {
        this.logout();
        this.errorService.handleError(err);
        throw err
      })
    );
  }
  
  public logout(){
    this.authTokenStorageService.remove();
    this.currentUserSignal.set(null);
  }

  /* Criação de um novo usuário */
  public register(newUser: IUser) {
    return this.httpClient.post<IUser>(`${this.API_URL}/register`, newUser);
  }

  /* Adquire dados do usuário atual utilizando o token JWT gerado */
  public fetchUser() : Observable<IUser>{
    const token = this.authTokenStorageService.get();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }

    return this.httpClient.get<IUser>(this.API_URL + '/me', { headers }).pipe(
      tap((u) => this.setCurrentUser(u)),
      catchError(err => {
        this.logout();
        throw err
      })
    );
  }

  /* Adquire o IUser atual logado */
  public getCurrentUser(): IUser | null {
    return this.currentUser()
  }

  /* Define o IUser atual logado */
  public setCurrentUser(user: IUser) {
    this.currentUserSignal.set(user);
  }
}
