import { ComponentPortal, DomPortalHost, PortalInjector, PortalOutlet } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, InjectionToken, Injector } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export const SIDENAVDATA = new InjectionToken<{}>('SIDENAV_DATA');

@Injectable({
	providedIn: 'root'
})
export class SidenavService {

	private sidenavPortalOutlet: PortalOutlet;
	private componentRef: ComponentRef<any>;

	private openSource = new Subject<void>();
	private closeSource = new Subject<void>();
	private isOpenedSource = new BehaviorSubject<boolean>(false);

	open$ = this.openSource.asObservable();
	close$ = this.closeSource.asObservable();
	isOpened$ = this.isOpenedSource.asObservable();

	constructor(
		private applicationRef: ApplicationRef,
		private injector: Injector
	) { }

	open(): void {
		this.openSource.next();
		this.isOpenedSource.next(true);
	}

	close(): void {
		this.closeSource.next();
		this.isOpenedSource.next(false);
	}

	/** Used to create the data injected to the component
	 * that's going to be attached to the sidenav PortalOutlet.
	 * @param {any} data - The data to be injected into the component.
	 * @returns {PortalInjector} Returns the injector that's needed when
	 * creating a ComponentPortal instance.
	 */
	createData(data: any): PortalInjector {
		const injectorTokens = new WeakMap().set(SIDENAVDATA, data);

		return new PortalInjector(this.injector, injectorTokens);
	}

	/** Used to attach a ComponentPortal instance to the sidenav PortalOutlet.
	 * @param {ComponentPortal} portal - The ComponentPortal instance that's
	 * going to be attached to the sidenav PortalOutlet.
	 * @param {ComponentFactoryResolver} componentFactoryResolver - The component
	 * factory resolver instance of the module which the instantiated component belongs to.
	 * @param {Injector} injector - The injector instance of the module which the
	 * instantiated component belongs to.
	 * @returns {ComponentRef} Reference to the instantiated component.
	*/
	attachComponent(
		portal: ComponentPortal<any>,
		componentFactoryResolver: ComponentFactoryResolver,
		injector: Injector
	): ComponentRef<any> {
		this.sidenavPortalOutlet = new DomPortalHost(
			document.querySelector('#sidenav-portal-outlet'),
			componentFactoryResolver,
			this.applicationRef,
			injector
		);
		this.componentRef = this.sidenavPortalOutlet.attach(portal);

		return this.componentRef;
	}

	/** Used to detach a ComponentPortal from the sidenav PortalOutlet.*/
	detachComponent(): void {
		this.componentRef.destroy();
		this.sidenavPortalOutlet.detach();
	}

}
