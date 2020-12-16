
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import { Observable, of, throwError } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';
// import { ElFinderService } from 'src/app/core/services/el-finder.service';
// import { ErrorService } from 'src/app/core/services/error.service';
// import { SidenavService } from 'src/app/core/services/sidenav.service';
// import { SnackBarService } from 'src/app/core/services/snack-bar.service';
// import { ErrorCode } from 'src/app/shared/interfaces/error.code.enum';
// import { DialogSimpleData } from 'src/app/shared/netex/components/dialogs/dialog-simple/dialog-simple-data.interface';
// import { DialogSimpleComponent } from 'src/app/shared/netex/components/dialogs/dialog-simple/dialog-simple.component';
// import { dialogSimpleFactory } from 'src/app/shared/netex/components/dialogs/dialog-simple/dialog-simple.factory';
// import { environment } from 'src/environments/environment';
// import { WindowRefService } from '../services/window-ref.service';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {

// 	constructor(
// 		private router: Router,
// 		private dialog: MatDialog,
// 		private errorService: ErrorService,
// 		private translate: TranslateService,
// 		private windowRef: WindowRefService,
// 		private snackBarService: SnackBarService,
// 		private elFinderService: ElFinderService,
// 		private sidenavService: SidenavService
// 	) {
// 	}

// 	private handleUnauthorizedError() {
// 		this.windowRef.getNativeWindow().location.reload();
// 	}

// 	private permissionsNotFoundError() {
// 		this.router.navigate(['/403']);
// 	}

// 	private handleNotFoundError() {
// 		this.sidenavService.close();
// 		this.router.navigate(['/404']);
// 	}

// 	private handleElFinderError(errorRes: string | string[]) {
// 		this.snackBarService.open(this.elFinderService.parseErrors(errorRes));
// 	}

// 	private handleThreatFoundError(url: string) {
// 		if (url.includes('efconnect') !== true) {
// 			return this.openDialogServerError('FILE_UPLOAD.THREAT_FOUND');
// 		}
// 	}

// 	private handleLimitDiskReachedError() {
// 		return this.openDialogServerError('FILE_UPLOAD.MAX_DISK_REACHED');
// 	}

// 	private handleError(res: HttpResponse<any>): void {
// 		switch (res.status) {
// 			case 200:
// 				return this.handleElFinderError(res.body.error || res.body.warning);
// 			case 401:
// 				return this.handleUnauthorizedError();
// 			case 403:
// 				return this.permissionsNotFoundError();
// 			case 404:
// 				return this.handleNotFoundError();
// 			case ErrorCode.THREAT_FOUND:
// 				return this.handleThreatFoundError(res.url);
// 			case ErrorCode.MAX_DISK_REACHED:
// 				return this.handleLimitDiskReachedError();
// 			case ErrorCode.MALFORMED_UNIT_COURSE:
// 				break;
// 			default:
// 				return this.openDialogServerError();
// 		}
// 	}

// 	openDialogServerError(message?: string) {
// 		const dialogData: DialogSimpleData = {
// 			title: 'Oups!',
// 			description: this.translate.instant(message || 'GENERIC_ERROR_MODAL.DESCRIPTION'),
// 			icon: 'icon-warning',
// 			textAlign: 'center',
// 			showCancelButton: false,
// 			disableClose: true,
// 			actions: [
// 				{ label: 'ok', id: 0 }
// 			]
// 		};
// 		this.errorService.openDialog();
// 		const dialogConfig = dialogSimpleFactory(dialogData);
// 		const dialog = this.dialog.open(DialogSimpleComponent, dialogConfig);

// 		dialog.afterClosed().subscribe((id: number) => {
// 			if (id === 0) {
// 				this.errorService.closeDialog();
// 				location.reload();
// 			}
// 		});
// 	}

// 	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// 		return next.handle(request)
// 			.pipe(
// 				switchMap((res: HttpResponse<any>): Observable<any> => {
// 					if (request.url.includes(environment.elFinderApiPath) && res.body && (res.body.error || res.body.warning)) {
// 						return throwError(res);
// 					} else {
// 						return of(res);
// 					}
// 				}),
// 				catchError((err: any) => {
// 					if (this.errorService.checkDialogStatus()) {
// 						this.handleError(err);
// 					}
// 					return throwError(err);
// 				})
// 			);
// 	}

// }
