import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapters/adapter.interface';
import { Catalogue } from 'src/app/shared/interfaces/catalogue.type';
import { ExtendedMetadata } from 'src/app/shared/interfaces/extended-metadata.interface';

@Injectable({
	providedIn: 'root'
})
export class CatalogueAdapter implements Adapter<Catalogue> {

	// ONLY USE FOR DEV

	adapt(item: any): Catalogue {
		// const catalogue: Catalogue = item.catalogue;
		const extendedMetadata: ExtendedMetadata = item.extendedMetadata;
		return {
			...item,
			extendedMetadata: {
				...extendedMetadata,
				computedPermissions: {
					...extendedMetadata.computedPermissions,

					// Update value for check permissions

					// Project
					permissionWrite_Project: true,
					permissionRemove_Project: true,
					permissionGrant_Project: false,
					// folder
					permissionWrite_Folder: true,
					permissionRemove_Folder: true,
					permissionWriteDescendant_Folder: false,
					permissionGrant_Folder: true,
					// unit external
					permissionRead_UnitExternal: true,
					permissionWrite_UnitExternal: true,
					permissionWriteDescendant_UnitExternal: false,
					permissionGrant_UnitExternal: true,
					permissionRemove_UnitExternal: false,
					permissionDelivery_UnitExternal: false,
					// unit authoring
					permissionRead_UnitCourse: true,
					permissionWrite_UnitCourse: true,
					permissionGrant_UnitCourse: true,
					permissionRemove_UnitCourse: true,
					permissionWriteDescendant_UnitCourse: false,
					permissionModerate_UnitCourse: false,
					// permission authoring unitCourse
					permissionAuthoring_UnitCourse: false,
					// unit Course Publication
					permissionWriteDescendant_UnitCoursePublication: false,
				}
			}
		};
	}

}
