<script lang="ts">
  import * as v from 'valibot';
  import { getContext } from 'svelte';
  import { type ToastContext } from '@skeletonlabs/skeleton-svelte';
  export const toast: ToastContext = getContext('toast');

  let iframeSrc = '';
  let inputValue = '';

  const triggerError = (description: string) => {
    toast.create({
      title: 'Error',
      description,
      type: 'error',
    });
  };

  const HttpSchema = v.pipe(
    v.string('Your URL must be a string.'),
    v.nonEmpty('Please enter a URL.'),
    v.url('The URL address is badly formatted.')
  );

  const onClick = () => {
    const { issues } = v.safeParse(HttpSchema, inputValue);

    if (issues?.[0].message) {
      triggerError(issues?.[0].message);
    }

    if (v.is(HttpSchema, inputValue)) {
      iframeSrc = inputValue;
    }
  };
</script>

<main class="flex w-full grow p-4 m-4 max-w-screen-sm">
  <div class="mb-6 flex flex-col items-start gap-4 grow justify-center">
    <label class="label">
      <span class="label-text">Enter a URL</span>
      <input
        class="input"
        type="text"
        placeholder="https://example.com"
        bind:value={inputValue}
      />
    </label>

    <button
      on:click={onClick}
      type="button"
      class="btn preset-outlined-primary-500 w-full">Open page in iframe</button
    >

    <iframe title="paymentpage" src={iframeSrc}></iframe>
  </div>
</main>

<style>
  iframe {
    background-color: rgb(20, 20, 20);
    height: 100vh;
    width: 100%;
    border-radius: 5px;
  }
</style>
