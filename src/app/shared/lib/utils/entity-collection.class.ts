import { BehaviorSubject, Observable } from 'rxjs';
import { SortDirectionName } from 'src/app/shared/lib/interfaces/sort-direction-name.enum';

interface IEntityCollection<T> {
	addAll: (entities: T[]) => void;
	addOne: (entity: T, index?: number) => void;
	addMany: (entities: T[]) => void;
	getAllEntitiesSync: () => T[];
	getAllIds: () => string[];
	getOne: (id: string) => T;
	getEntitiesCount: () => number;
	removeAll: () => void;
	removeOne: (id: string) => void;
	removeMany: (ids: string[]) => void;
	updateOne: (id: string, entity: T) => void;
	sort: (property: string, direction: SortDirectionName, from?: number, to?: number) => void;
}

export class EntityCollection<T> implements IEntityCollection<T> {

	private entities: T[] = [];
	// private entities: {[key: string]: T};
	private entitiesSource: BehaviorSubject<T[]>;

	constructor(
		private initialValue?: T[],
		private idField: string = 'id'
	) {
		this.entitiesSource = new BehaviorSubject<T[]>(initialValue);
	}

	private emitEntities() {
		this.entitiesSource.next(this.entities);
	}

	private filterDuplicates(entities: T[], newEntities: T[]): T[] {
		return newEntities.filter((a: T) => !entities.some((b: T) => b[this.idField] === a[this.idField]));
	}

	addAll(entities: T[]): void {
		this.entities = [...entities];
		this.emitEntities();
	}

	addOne(entity: T): void {
		this.entities = [...this.entities, entity];
		this.emitEntities();
	}

	addOneInIndex(entity: T, index: number): void {
		this.entities.splice(index, 0, entity);
		this.entities = [...this.entities];
		this.emitEntities();
	}

	addMany(entities: T[]): void {
		this.entities = [...this.entities, ...this.filterDuplicates(this.entities, entities)];
		this.emitEntities();
	}

	getAllEntitiesSync(): T[] {
		return this.entities;
	}

	getAllEntitiesAsync(): Observable<T[]> {
		return this.entitiesSource.asObservable();
	}

	getAllIds(): string[] {
		return this.entities.map((entity: T) => entity[this.idField]);
	}

	getOne(id: string): T {
		return this.entities.find((entity: T) => entity[this.idField] === id);
	}

	getEntitiesCount(): number {
		return this.entities ?
			this.entities.length
			: undefined;
	}

	removeAll(): void {
		this.entities = this.initialValue;
		this.emitEntities();
	}

	removeOne(id: string): void {
		this.entities = this.entities.filter((entity: T) => entity[this.idField] !== id);
		this.emitEntities();
	}

	removeMany(ids: string[]): void {
		this.entities = this.entities.filter((entity: T) => !ids.includes(entity[this.idField]));
		this.emitEntities();
	}

	updateOne(id: string, newEntity: T): void {
		const index = this.entities.findIndex((entity: T) => entity[this.idField] === id);

		this.entities[index] = newEntity;
		this.entities = [...this.entities];
		this.emitEntities();
	}

	hasElement(id: string): boolean {
		return this.entities.map((entity: T) => entity[this.idField]).includes(id);
	}

	sort(property: string, direction: SortDirectionName, from?: number, to?: number) {
		from = from || 0;
		to = to || this.entities.length;

		if (from < 0 || to > this.entities.length) {
			return;
		}

		const entitiesSort = this.sortCollection(this.entities.slice(from, to), property, direction);

		if (from === 0) {
			this.entities = [...entitiesSort, ...this.entities.slice(to)];
		} else {
			this.entities = [...this.entities.slice(0, from), ...entitiesSort, ...this.entities.slice(to)];
		}
		this.emitEntities();
	}

	private sortCollection(items: T[], property?: string, direction?: SortDirectionName): T[] {
		if (direction === SortDirectionName.ASC) {
			return [...items.sort((a, b) => a[property].localeCompare(b[property]))];
		} else {
			return [...items.sort((a, b) => b[property].localeCompare(a[property]))];
		}
	}
}
