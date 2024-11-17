import type { EventMap, Options, Splide } from '@splidejs/splide';
import {
  EVENT_ACTIVE,
  EVENT_ARROWS_MOUNTED,
  EVENT_ARROWS_UPDATED,
  EVENT_AUTOPLAY_PAUSE,
  EVENT_AUTOPLAY_PLAY,
  EVENT_AUTOPLAY_PLAYING,
  EVENT_CLICK,
  EVENT_DESTROY,
  EVENT_DRAG,
  EVENT_DRAGGED,
  EVENT_DRAGGING,
  EVENT_HIDDEN,
  EVENT_INACTIVE,
  EVENT_LAZYLOAD_LOADED,
  EVENT_MOUNTED,
  EVENT_MOVE,
  EVENT_MOVED,
  EVENT_NAVIGATION_MOUNTED,
  EVENT_PAGINATION_MOUNTED,
  EVENT_PAGINATION_UPDATED,
  EVENT_REFRESH,
  EVENT_RESIZE,
  EVENT_RESIZED,
  EVENT_SCROLL,
  EVENT_SCROLLED,
  EVENT_UPDATED,
  EVENT_VISIBLE,
} from '@splidejs/splide';
import type { PaginationData, PaginationItem, SlideComponent } from '@splidejs/splide';
import type { EventDetail, Events } from '$lib/types/events';

const EVENTS_WITHOUT_ARGS: Array<keyof EventMap> = [
  //EVENT_MOUNTED, -> todo: splidejs events do we need this or splide should take over?
  EVENT_REFRESH,
  EVENT_RESIZE,
  EVENT_RESIZED,
  EVENT_DRAG,
  EVENT_DRAGGING,
  EVENT_DRAGGED,
  EVENT_SCROLL,
  EVENT_SCROLLED,
  //EVENT_DESTROY, -> todo: splidejs events do we need this or splide should take over?
  EVENT_AUTOPLAY_PLAY,
  EVENT_AUTOPLAY_PAUSE,
];

/**
 * Binds Splide events to the svelte dispatcher.
 *
 * @since 0.1.0
 *
 * @param splide     - A splide instance.
 * @param dispatchFn - A dispatch function created by `createEventDispatcher()`.
 */
export function bind<T extends ( ...args: any[] ) => any>( splide: Splide, dispatchFn: T ): void {
  const dispatch = ( event: keyof EventMap, detail: Record<string, unknown> = {} ) => {
    dispatchFn( transform( event ), { splide, ...detail } );
  };

  splide.on( EVENT_CLICK, ( Slide: SlideComponent, e: MouseEvent ) => {
    dispatch( EVENT_CLICK, { Slide, e } );
  } );

  splide.on( EVENT_MOVE, ( index: number, prev: number, dest: number ) => {
    dispatch( EVENT_MOVE, { index, prev, dest } );
  } );

  splide.on( EVENT_MOVED, ( index: number, prev: number, dest: number ) => {
    dispatch( EVENT_MOVED, { index, prev, dest } );
  } );

  splide.on( EVENT_ACTIVE, ( Slide: SlideComponent ) => {
    dispatch( EVENT_ACTIVE, { Slide } );
  } );

  splide.on( EVENT_INACTIVE, ( Slide: SlideComponent ) => {
    dispatch( EVENT_INACTIVE, { Slide } );
  } );

  splide.on( EVENT_VISIBLE, ( Slide: SlideComponent ) => {
    dispatch( EVENT_VISIBLE, { Slide } );
  } );

  splide.on( EVENT_HIDDEN, ( Slide: SlideComponent ) => {
    dispatch( EVENT_HIDDEN, { Slide } );
  } );

  splide.on( EVENT_UPDATED, ( options: Options ) => {
    dispatch( EVENT_UPDATED, options );
  } );

  splide.on( EVENT_ARROWS_MOUNTED, ( prev: HTMLButtonElement, next: HTMLButtonElement ) => {
    dispatch( EVENT_ARROWS_MOUNTED, { prev, next } );
  } );

  splide.on( EVENT_ARROWS_UPDATED, ( prev: HTMLButtonElement, next: HTMLButtonElement ) => {
    dispatch( EVENT_ARROWS_UPDATED, { prev, next } );
  } );

  splide.on( EVENT_PAGINATION_MOUNTED, ( data: PaginationData, item: PaginationItem ) => {
    dispatch( EVENT_PAGINATION_MOUNTED, { data, item } );
  } );

  splide.on( EVENT_PAGINATION_UPDATED, ( data: PaginationData, prev: PaginationItem, curr: PaginationItem ) => {
    dispatch( EVENT_PAGINATION_UPDATED, { data, prev, curr } );
  } );

  splide.on( EVENT_NAVIGATION_MOUNTED, ( splides: Splide[] ) => {
    dispatch( EVENT_NAVIGATION_MOUNTED, { splides } );
  } );

  splide.on( EVENT_AUTOPLAY_PLAYING, ( rate: number ) => {
    dispatch( EVENT_AUTOPLAY_PLAYING, { rate } );
  } );

  splide.on( EVENT_LAZYLOAD_LOADED, ( img: HTMLImageElement, Slide: SlideComponent ) => {
    dispatch( EVENT_LAZYLOAD_LOADED, { img, Slide } );
  } );

  EVENTS_WITHOUT_ARGS.forEach( event => {
    splide.on( event, () => {
      dispatch( event );
    } );
  } );
}

/**
 * Maps Svelte events to corresponding Splide.js events.
 *
 * @param splide - A Splide instance.
 * @param events - An object containing Svelte event handlers.
 */
export function mapEvents(splide: Splide, events: Partial<Events>): void {
  const eventMap: Record<string, keyof EventMap> = {
    active: 'active',
    arrowsMounted: 'arrows:mounted',
    arrowsUpdated: 'arrows:updated',
    autoplayPause: 'autoplay:pause',
    autoplayPlay: 'autoplay:play',
    autoplayPlaying: 'autoplay:playing',
    click: 'click',
    drag: 'drag',
    dragged: 'dragged',
    dragging: 'dragging',
    hidden: 'hidden',
    inactive: 'inactive',
    lazyloadLoaded: 'lazyload:loaded',
    move: 'move',
    moved: 'moved',
    navigationMounted: 'navigation:mounted',
    paginationMounted: 'pagination:mounted',
    paginationUpdated: 'pagination:updated',
    refresh: 'refresh',
    resize: 'resize',
    resized: 'resized',
    scroll: 'scroll',
    scrolled: 'scrolled',
    updated: 'updated',
    visible: 'visible',
    mounted: 'mounted',
    ready: 'ready',
    overflow: 'overflow',
    destroy: 'destroy',
    arrowsUpdatedWithIndex: 'arrows:updated', // Custom mapping for arrows:updated with index
  };

  Object.entries(events).forEach(([key, handler]) => {
    if (handler && eventMap[key]) {
      const splideEvent = eventMap[key];
      const callback = (args: any[]) => handler({ splide, ...args });

      switch (splideEvent) {
        case 'click':
          splide.on(splideEvent, (Slide: SlideComponent, e: MouseEvent) => callback({ Slide, e }));
          break;
        case 'move':
        case 'moved':
          splide.on(splideEvent, (index: number, prev: number, dest: number) => callback({ index, prev, dest }));
          break;
        case 'arrows:mounted':
        case 'arrows:updated':
          splide.on(splideEvent, (prev: HTMLButtonElement, next: HTMLButtonElement, prevIndex?: number, nextIndex?: number) => callback({ prev, next, prevIndex, nextIndex }));
          break;
        case 'pagination:mounted':
        case 'pagination:updated':
          splide.on(splideEvent, (data: PaginationData, prev: PaginationItem, curr: PaginationItem) => callback({ data, prev, curr }));
          break;
        case 'navigation:mounted':
          splide.on(splideEvent, (splides: Splide[]) => callback({ splides }));
          break;
        case 'autoplay:playing':
          splide.on(splideEvent, (rate: number) => callback({ rate }));
          break;
        case 'lazyload:loaded':
          splide.on(splideEvent, (img: HTMLImageElement, Slide: SlideComponent) => callback({ img, Slide }));
          break;
        case 'overflow':
          splide.on(splideEvent, (overflow: boolean) => callback({ overflow }));
          break;
        default:
          splide.on(splideEvent, () => callback({}));
      }
    }
  });
}

/**
 * Transforms Splide event names to the camel case.
 *
 * @since 0.1.0
 *
 * @param event - An event name to transform.
 *
 * @return A transformed event name.
 */
function transform( event: keyof EventMap ): string {
  return event.split( ':' )
    .map( ( fragment, index ) => {
      return index > 0 ? fragment.charAt( 0 ).toUpperCase() + fragment.slice( 1 ) : fragment;
    } )
    .join( '' )
    .replace( 'Lazyload', 'LazyLoad' );
}