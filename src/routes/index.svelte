<script>
import { onMount, getContext } from 'svelte';
import { heroes } from '../stores/heroes';
import { matchups } from '../stores/matchups';
import { offeredHeroes } from '../stores/offeredHeroes';
import Loader from '../components/Loader.svelte';
import Search from '../components/Search.svelte';
import HeroButton from '../components/HeroButton.svelte';
import Swal from 'sweetalert2';

    onMount(heroes.getData);

    let search = '';
    let heroId = null;
    let selectedHeroes = new Set();

    $: filteredHeroes = Object
    .values($heroes)
    .filter(({ localized_name }) => localized_name.toLowerCase().includes(search))
    .sort((a, b) => a.localized_name.localeCompare(b.localized_name));

    function getHeroDetails(event) {
    heroId = event.detail;
    if (heroId !== null) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }
  }

    function selectHero(event) {
        const heroId = event.detail;
        if(selectedHeroes.has(heroId)) {
            selectedHeroes.delete(heroId);
            selectedHeroes = selectedHeroes; // ...selectedHeroes
            matchups.removeMatchup(heroId);
            return;
        }

        if (selectedHeroes.size === 5) {
            matchups.removeMatchup(heroId);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'The maximum number of selected heroes cannot be higher than 5. Please unselect heroes to continue.',
                width: 600,
                padding: '3em',
                color: '#000000',
                background: '#fff',
                backdrop: `
                    rgba(0,0,123,0.4)
                `
            })
        }

        selectedHeroes = new Set([...selectedHeroes, heroId]);
        matchups.getMatchup(heroId);
    }

</script>

{#if selectedHeroes.size}
    <div class="heroes">
        {#each $offeredHeroes as hero (hero.id)}
            <HeroButton hero={$heroes[hero.id]} on:click={getHeroDetails}>
                <div class="winrate">{hero.win_rate}%</div>
            </HeroButton>
        {:else}
            <Loader/>
        {/each}
    </div>
{/if}


<Search bind:value={search} />

<div class="heroes">
    {#each filteredHeroes as hero (hero.id)}
        <HeroButton
            hero={hero}
            selected={selectedHeroes.has(hero.id)}
            on:click={selectHero}
        />
    {:else}
        {#if search}
            <p class="empty">No heroes match your search criteria.</p>
        {:else}
            <Loader/>
        {/if}
    {/each}
</div>

<div class="footer">
    Copyright &copy; 2022. Made with <svg fill="#e74c3c" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg> in Bacău, Romania.
</div>

<style>
    .heroes {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        padding-bottom: 3rem;
        padding-top: 3rem;
    }

    .winrate {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 1;
        padding: 5px;
        font-size: 22px;
        color: #63ff63;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .empty {
        font-size: 32px;
        color: #FFF;
    }
    .footer {
        font-family: Roboto, sans-serif;
        font-size: 14px;
        color: #FFF;
        text-align: center;
        padding: 2rem 0 4rem;
        text-shadow: 1px 1px 1px #ff4a4a, 0 0 1em #64d4ff, 0 0 0.2em #58ff58;
    }
</style>