const elixir = require('laravel-elixir');

// Working directories
elixir.config.assetsPath = 'src';
elixir.config.publicPath = 'dist';

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 */

elixir(mix => {
    mix.sass('content.scss')
      .sass('standup.scss')
      .scripts('better-jira.js')
      .scripts('popup.js');
});
