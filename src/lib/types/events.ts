import type { EventMap, Options, PaginationData, PaginationItem, SlideComponent, Splide } from '@splidejs/splide';
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
    EVENT_READY,
    EVENT_OVERFLOW
  } from '@splidejs/splide';


export type EventDetail = { splide: Splide };

export type SlideEventDetail = { Slide: SlideComponent } & EventDetail;

export type ArrowsMountedEventDetail = { prev: HTMLButtonElement, next: HTMLButtonElement } & EventDetail;

export type ArrowsUpdatedEventDetail = ArrowsMountedEventDetail & { prevIndex: number, nextIndex: number };

export type MoveEventDetail = { index: number, prev: number, dest: number } & EventDetail;

export type OverflowEventDetail = { overflow: boolean } & EventDetail;

export type OptionsEventDetail = { options: Options } & EventDetail;

export type PaginationMountedEventDetail = { data: PaginationData, item: PaginationItem } & EventDetail;

export type PaginationUpdatedEventDetail = { data: PaginationData, prev: PaginationItem, curr: PaginationItem} & EventDetail

export type NavigationMountedEventDetail = { splides: Splide[] } & EventDetail;

export type LazyloadLoadedEventDetail = { img: HTMLImageElement } & SlideEventDetail

export type AutoplayPlayingEventDetail = { rate: number } & EventDetail;

export type Events = {
    mounted?: (e: EventDetail) => void
    ready: (e: EventDetail) => void
    click?: (e: SlideEventDetail) => void
    move?: (e: MoveEventDetail) => void
    moved?: (e: MoveEventDetail) => void
    active?: (e: SlideEventDetail) => void
    inactive?: (e: SlideEventDetail) => void
    visible?: (e: SlideEventDetail) => void
    hidden?: (e: SlideEventDetail) => void
    refresh?: (e: EventDetail) => void
    updated?: (e: OptionsEventDetail) => void
    resize?: (e: EventDetail) => void
    resized?: (e: EventDetail) => void
    drag?: (e: EventDetail) => void
    dragged?: (e: EventDetail) => void
    dragging?: (e: EventDetail) => void
    scroll?: (e: EventDetail) => void
    scrolled?: (e: EventDetail) => void
    overflow: (e: OverflowEventDetail) => void;
    destroy?: (e: EventDetail) => void
    arrowsMounted?: (e: ArrowsMountedEventDetail) => void
    arrowsUpdated?: (e: ArrowsUpdatedEventDetail) => void
    paginationMounted?: (e: PaginationMountedEventDetail) => void
    paginationUpdated?: (e: PaginationUpdatedEventDetail) => void
    navigationMounted?: (e: NavigationMountedEventDetail) => void
    autoplayPlay?: (e: EventDetail) => void
    autoplayPlaying?: (e: AutoplayPlayingEventDetail) => void
    autoplayPause?: (e: EventDetail) => void
    lazyloadLoaded?: (e: LazyloadLoadedEventDetail) => void
}

export const EventsMap: Record<string, keyof EventMap> = {
    mounted: EVENT_MOUNTED,
    ready: EVENT_READY, 
    click: EVENT_CLICK,
    move: EVENT_MOVE,
    moved: EVENT_MOVED,    
    active: EVENT_ACTIVE,
    inactive: EVENT_INACTIVE,
    visible: EVENT_VISIBLE,
    hidden: EVENT_HIDDEN,
    refresh: EVENT_REFRESH,
    updated: EVENT_UPDATED,
    resize: EVENT_RESIZE,
    resized: EVENT_RESIZED,
    drag: EVENT_DRAG,
    dragged: EVENT_DRAGGED,
    dragging: EVENT_DRAGGING,
    scroll: EVENT_SCROLL,
    scrolled: EVENT_SCROLLED,
    overflow: EVENT_OVERFLOW, 
    destroy: EVENT_DESTROY,
    arrowsMounted: EVENT_ARROWS_MOUNTED,
    arrowsUpdated: EVENT_ARROWS_UPDATED,
    paginationMounted: EVENT_PAGINATION_MOUNTED,
    paginationUpdated: EVENT_PAGINATION_UPDATED,
    navigationMounted: EVENT_NAVIGATION_MOUNTED,
    autoplayPause: EVENT_AUTOPLAY_PAUSE,
    autoplayPlay: EVENT_AUTOPLAY_PLAY,
    autoplayPlaying: EVENT_AUTOPLAY_PLAYING,
    lazyloadLoaded: EVENT_LAZYLOAD_LOADED,
  };