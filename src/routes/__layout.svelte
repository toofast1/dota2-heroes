<script>

</script>

<svelte:head>
    <title>Dota 2 Counter Heroes | Dota2 Heroes Advisor</title>
    <meta name="description" content="Dota2 heroes advisor helps you choose enemy heroes and get the best counter heroes to win your next game!">
    <meta name="keywords" content="Dota2, heroes, winrate, prediction">
</svelte:head>

<div class="wrapper">
    <h1 class="logo">Dota2 Heroes Advisor</h1>
    <slot></slot>
</div>

<style>
    :global(head),
    :global(body) {
        margin: 0;
        padding: 0;
    }

    :global(body) {
        font-family: Arial, serif;
        background-image: linear-gradient(90deg, #404040, #2a3a28, #523434, #4b5d6d);
    }

    :global(*) {
        box-sizing: border-box;
    }

    :global(:root) {
        --agility-color: #58ff58;
        --strength-color: #ff4a4a;
        --intelligence-color: #64d4ff;
    }

    .wrapper {
        max-width: 1340px;
        margin: 0 auto;
    }

    .logo {
        text-align: center;
        text-transform: uppercase;
        font-family: monospace;
        letter-spacing: 5px;
        color: #fff;
        text-shadow: 1px 1px 2px #ff4a4a, 0 0 1em #64d4ff, 0 0 0.2em #58ff58;
        padding: 3rem 0 1rem;
    }
</style>