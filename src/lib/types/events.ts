import type { ComponentConstructor, Options, PaginationData, PaginationItem, SlideComponent, Splide } from '@splidejs/splide';
import { on } from 'svelte/events';



export type EventDetail<T extends Record<string, unknown> = Record<string, unknown>> = { splide: Splide } & T;

export type SlideEventDetail = EventDetail<{ Slide: SlideComponent }>;

export type ArrowsEventDetail = EventDetail<{ prev: HTMLButtonElement, next: HTMLButtonElement }>;

export type MoveEventDetail = EventDetail<{ index: number, prev: number, dest: number }>;

export type Events = {
    mounted?: (e: EventDetail) => void
    destroy?: (e: EventDetail) => void
    active?: (e: SlideEventDetail) => void
    arrowsMounted?: (e: ArrowsEventDetail) => void
    arrowsUpdated?: (e: ArrowsEventDetail) => void
    autoplayPause?: (e: EventDetail) => void
    autoplayPlay?: (e: EventDetail) => void
    autoplayPlaying?: (e: EventDetail<{ rate: number }>) => void
    click?: (e: SlideEventDetail) => void
    drag?: (e: EventDetail) => void
    dragged?: (e: EventDetail) => void
    dragging?: (e: EventDetail) => void
    hidden?: (e: SlideEventDetail) => void
    inactive?: (e: SlideEventDetail) => void
    lazyloadLoaded?: (e: EventDetail<{
        img: HTMLImageElement
        Slide: SlideComponent
    }>) => void
    move?: (e: MoveEventDetail) => void
    moved?: (e: MoveEventDetail) => void
    navigationMounted?: (e: EventDetail<{ splides: Splide[] }>) => void
    paginationMounted?: (e: EventDetail<{
        data: PaginationData
        item: PaginationItem
    }>) => void
    paginationUpdated?: (e: EventDetail<{
        data: PaginationData
        prev: PaginationItem
        curr: PaginationItem
    }>) => void
    refresh?: (e: EventDetail) => void
    resize?: (e: EventDetail) => void
    resized?: (e: EventDetail) => void
    scroll?: (e: EventDetail) => void
    scrolled?: (e: EventDetail) => void
    updated?: (e: EventDetail<{ options: Options }>) => void
    visible?: (e: SlideEventDetail) => void
}




