import { animate, AnimationMetadata, query, stagger, state, style, transition } from '@angular/animations';

export function animationFadeScale(): AnimationMetadata[] {
	return [
		state('void', style({ opacity: 0, transform: 'scale(0)' })),
		state('false', style({ opacity: 0, transform: 'scale(0)' })),
		state('true', style({ opacity: 1, transform: 'scale(1)' })),
		transition(':enter', animate('200ms ease-in')),
		transition(':leave', animate('200ms ease-out')),
		transition('* => false', animate('200ms ease-out'))
	];
}

export function animationFade(): AnimationMetadata[] {
	return [
		state('void', style({ opacity: 0 })),
		state('false', style({ opacity: 0 })),
		state('true', style({ opacity: 1 })),
		transition(':enter', animate('100ms ease-in')),
		transition(':leave', animate('100ms ease-out')),
		transition('* => false', animate('100ms ease-out'))
	];
}

export function animationFlyInOut(): AnimationMetadata[] {
	return [
		state('in', style({ transform: 'translateX(0)' })),
		transition(':enter', [
			style({ transform: 'translateX(-100%)' }),
			animate('0.3s ease', style({
				opacity: 1
			}))]),
		transition(':leave', [
			animate(100, style({ transform: 'translateX(100%)' }))
		])
	];
}

export function spinInOut(): AnimationMetadata[] {
	return [
		state('in', style({ transform: 'rotate(0)', opacity: '1' })),
		transition(':enter', [
			style({ transform: 'rotate(-180deg)', opacity: '0' }),
			animate('150ms ease')
		]),
		transition(':leave', [
			animate('150ms ease', style({ transform: 'rotate(180deg)', opacity: '0' }))
		]),
	];
}

export function listStagger(): AnimationMetadata[] {
	return [
		transition('* => *', [
			query(':leave', [
				style({ opacity: 1, transform: 'none' }),
				stagger(50, [
					animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',
						style({ opacity: 0, transform: 'translate(25px,100px)' }))
				])
			], { optional: true }),
			query(':enter', [
				style({ opacity: 0, transform: 'translate(25px,100px)' }),
				stagger(50, [
					animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',
						style({ opacity: 1, transform: 'none' }))
				])
			], { optional: true })
		])
	];
}
