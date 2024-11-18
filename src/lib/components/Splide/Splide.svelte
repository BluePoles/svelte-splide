<script lang="ts">
	import {
		classNames,
		getSlides,
		isEqualDeep,
		isEqualShallow,
	} from '$lib/utils'
	import type {
		ComponentConstructor,
		Options
	} from '@splidejs/splide'
	import { Splide } from '@splidejs/splide'
	import { onMount } from 'svelte'
	import { mapEvents } from './bind'
	import { SplideTrack } from '$lib/components'
	import type { Events } from '$lib/types'

	let {
		children,
		className,
		options = $bindable(),
		//splide -> todo: why do we need this as prop, why would caller pass splide instance? Any use case for this? 
		extensions,
		transition,
		hasTrack = true,
		...events
	}: {
		children?: import('svelte').Snippet
		className?: string
		options?: Options
		//splide?: Splide -> todo: why do we need this as prop, why would caller pass splide instance? Any use case for this? 
		extensions?: Record<string, ComponentConstructor>
		transition?: ComponentConstructor
		hasTrack?: boolean
	} & Events = $props()

	/**
	 * The root element.
	 */
	 let splide: Splide

	/**
	 * The root element.
	 */
	let root: HTMLElement

	/**
	 * Holds the previous slide elements.
	 */
	let prevSlides: HTMLElement[]

	/**
	 * Holds the previous options.
	 * and Updates splide options only when they have difference with previous options.
	 */
	let _prevOptions: Options | undefined = options ? { ...options } : undefined
	let prevOptions:Options | undefined = $derived.by(() => {
		if (splide && !isEqualDeep(prevOptions, options)) {
			splide.options = options ?? {}
			_prevOptions = { ...options }
		}
		return _prevOptions
	})


	onMount(() => {
		splide = new Splide(root, options)
		mapEvents(splide, events);
		splide.mount(extensions, transition)
		prevSlides = getSlides(splide)
		
		return () => {
			splide?.destroy(true)
		}
	})

	//todo: dont understand this part why do we need to do anything here this is same as ondestroy
	$effect(() => {
		return () => {
			//splide?.destroy()
			const newSlides = getSlides(splide!)

			if (!isEqualShallow(prevSlides, newSlides)) {
				splide?.refresh()
				prevSlides = newSlides.slice()
			}
		}
	})

	// /**
	//  * Moves the slider by the specified control.
	//  *
	//  * @param control - A control pattern.
	//  */
	export function go(control: number | string): void {
		splide?.go(control)
	}

	/**
	 * Syncs the slider with another Splide.
	 *
	 * @param target - A target splide instance to sync with.
	 */
	export function sync(target: Splide): void {
		splide?.sync(target)
	}
</script>

<div class={classNames('splide', className)} bind:this={root}>
	{#if hasTrack}
		<SplideTrack class={className}>
			{@render children?.()}
		</SplideTrack>
	{:else}
		{@render children?.()}
	{/if}
</div>

