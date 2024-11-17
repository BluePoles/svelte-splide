<script lang="ts">
	import { classNames } from '$lib/utils'

	let {
		class: className = undefined,
		children
	}: {
		class?: string | undefined
		children?: import('svelte').Snippet
	} = $props()
</script>

<div class={classNames('splide__track', className)}>
	<ul class="splide__list">
		{@render children?.()}
	</ul>
</div>
