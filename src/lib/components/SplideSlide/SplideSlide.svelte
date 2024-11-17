<script lang="ts">
	import { classNames } from '$lib/utils'

	let {
		class: className = undefined,
		children
	}: {
		class?: string | undefined
		children?: import('svelte').Snippet
		[key: string]: any
	} = $props()
</script>

<li class={classNames('splide__slide', className)}>
	{@render children?.()}
</li>
