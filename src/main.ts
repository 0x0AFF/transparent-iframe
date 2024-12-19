import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import Provider from './Provider.svelte';

const app = mount(Provider, {
  target: document.getElementById('app')!,
});

export default app;
