import { ComponentType } from '@angular/cdk/overlay/index';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { SidenavService } from 'src/app/core/services/sidenav.service';

export class SidenavOpenerService {

	constructor(
		protected sidenavService: SidenavService,
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected injector: Injector
	) { }

	openSidenav(comp: ComponentType<any>, data?: PortalInjector): ComponentRef<any> {
		const portal = new ComponentPortal(comp, undefined, data);

		const compRef = this.sidenavService.attachComponent(
			portal,
			this.componentFactoryResolver,
			this.injector
		);

		this.sidenavService.open();

		return compRef;
	}

}
