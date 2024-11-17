<script lang="ts">
  import type { Options, PaginationData, PaginationItem, SlideComponent } from '@splidejs/splide';
  import { Splide, SplideSlide } from '$lib/components';
  import { generateSlides } from '../utils';
  import type { EventDetail, MoveEventDetail, SlideEventDetail, ArrowsEventDetail } from '$lib/types/events';
  import Index from '../index.svelte'
  
  const slides = generateSlides();
  const options: Options = {
    rewind : true,
    perPage: 2,
    gap    : '1rem',
    height : '15rem',
    cover  : true,
    breakpoints: {
      1000: {
        perPage: 1,
      },
    },
  }
</script>

<div class="wrapper">
  <h2>Basic</h2>

  <Splide
    {options}
    mounted={(e: EventDetail) => {
      console.log('Splide is mounted.', e.splide);
    }}
    destroy={(e: EventDetail) => {
      console.log('Splide is destroyed.', e.splide);
    }}
    active={(e: SlideEventDetail) => {
      console.log('Slide is active.', e.Slide);
    }}
    arrowsMounted={(e: ArrowsEventDetail) => {
      console.log('Arrows are mounted.', e.prev, e.next);
    }}
    arrowsUpdated={(e: ArrowsEventDetail) => {
      console.log('Arrows are updated.', e.prev, e.next);
    }}
    autoplayPause={(e: EventDetail) => {
      console.log('Autoplay is paused.', e.splide);
    }}
    autoplayPlay={(e: EventDetail) => {
      console.log('Autoplay is playing.', e.splide);
    }}
    autoplayPlaying={(e: EventDetail<{ rate: number }>) => {
      console.log('Autoplay is playing with rate.', e.rate);
    }}
    click={(e: SlideEventDetail) => {
      console.log('Slide is clicked.', e.Slide);
    }}
    drag={(e: EventDetail) => {
      console.log('Dragging started.', e.splide);
    }}
    dragged={(e: EventDetail) => {
      console.log('Dragging ended.', e.splide);
    }}
    dragging={(e: EventDetail) => {
      console.log('Dragging.', e.splide);
    }}
    hidden={(e: SlideEventDetail) => {
      console.log('Slide is hidden.', e.Slide);
    }}
    inactive={(e: SlideEventDetail) => {
      console.log('Slide is inactive.', e.Slide);
    }}
    lazyloadLoaded={(e: EventDetail<{ img: HTMLImageElement, Slide: SlideComponent }>) => {
      console.log('Lazyload image is loaded.', e.img, e.Slide);
    }}
    move={(e: MoveEventDetail) => {
      console.log('Move to', e.index);
    }}
    moved={(e: MoveEventDetail) => {
      console.log('Moved to', e.index);
    }}
    navigationMounted={(e: EventDetail<{ splides: Splide[] }>) => {
      console.log('Navigation is mounted.', e.splides);
    }}
    paginationMounted={(e: EventDetail<{ data: PaginationData, item: PaginationItem }>) => {
      console.log('Pagination is mounted.', e.data, e.item);
    }}
    paginationUpdated={(e: EventDetail<{ data: PaginationData, prev: PaginationItem, curr: PaginationItem }>) => {
      console.log('Pagination is updated.', e.data, e.prev, e.curr);
    }}
    refresh={(e: EventDetail) => {
      console.log('Splide is refreshed.', e.splide);
    }}
    resize={(e: EventDetail) => {
      console.log('Splide is resized.', e.splide);
    }}
    resized={(e: EventDetail) => {
      console.log('Splide is resized.', e.splide);
    }}
    scroll={(e: EventDetail) => {
      console.log('Scrolling.', e.splide);
    }}
    scrolled={(e: EventDetail) => {
      console.log('Scrolled.', e.splide);
    }}
    updated={(e: EventDetail<{ options: Options }>) => {
      console.log('Splide is updated.', e.options);
    }}
    visible={(e: SlideEventDetail) => {
      console.log('Slide is visible.', e.Slide);
    }}
  >
    {#each slides as slide}
      <SplideSlide>
        <img src={slide.src} alt={slide.alt}>
      </SplideSlide>
    {/each}
  </Splide>
</div>