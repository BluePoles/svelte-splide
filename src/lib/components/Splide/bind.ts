import type { Options, Splide } from '@splidejs/splide';
import type { PaginationData, PaginationItem, SlideComponent } from '@splidejs/splide';
import type { Events } from '$lib/types/events';
import { EventsMap } from '$lib/types/events';

const nameof = (name: keyof Events): any => name;

/**
 * Maps Svelte events to corresponding Splide.js events.
 *
 * @param splide - A Splide instance.
 * @param events - An object containing Svelte event handlers.
 */
export function mapEvents(splide: Splide, events: Events): void {
  
  Object.entries(events).forEach(([key, handler]) => {
    if (handler && EventsMap[key]) {
      const callback = (attr?: object) => handler({ splide, ...attr } as any);

      switch (key) {
        case nameof('click'):
          splide.on(EventsMap[key], (Slide: SlideComponent, e: MouseEvent) => callback({ Slide, e }));
          break;
        case nameof('move'):
        case nameof('moved'):
          splide.on(EventsMap[key], (index: number, prev: number, dest: number) => callback({ index, prev, dest }));
          break;
        case nameof('active'):
        case nameof('inactive'):
        case nameof('visible'):
        case nameof('hidden'):
          splide.on(EventsMap[key], (Slide: SlideComponent) => callback({ Slide }));
          break
        case nameof('updated'):
          splide.on(EventsMap[key], (options: Options) => callback({ options }));
          break
        case nameof('overflow'):
          splide.on(EventsMap[key], (overflow: boolean) => callback({ overflow }));
          break;
        case nameof('arrowsMounted'):
          splide.on(EventsMap[key], (prev: HTMLButtonElement, next: HTMLButtonElement) => callback({ prev, next }));
        case nameof('arrowsUpdated'):
          splide.on(EventsMap[key], (prev: HTMLButtonElement, next: HTMLButtonElement, prevIndex?: number, nextIndex?: number) => callback({ prev, next, prevIndex, nextIndex }));
          break;
        case nameof('paginationMounted'):
          splide.on(EventsMap[key], (data: PaginationData, item: PaginationItem) => callback({ data, item }));
        case nameof('paginationUpdated'):
          splide.on(EventsMap[key], (data: PaginationData, prev: PaginationItem, curr: PaginationItem) => callback({ data, prev, curr }));
          break;
        case nameof('navigationMounted'):
          splide.on(EventsMap[key], (splides: Splide[]) => callback({ splides }));
          break;
          case nameof('autoplayPlaying'):
          splide.on(EventsMap[key], (rate: number) => callback({ rate }));
          break;
          case nameof('lazyloadLoaded'):
          splide.on(EventsMap[key], (img: HTMLImageElement, Slide: SlideComponent) => callback({ img, Slide }));
          break;
        default:
          splide.on(EventsMap[key], callback);
      }
    }
  });
}