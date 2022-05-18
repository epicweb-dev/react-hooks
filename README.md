<div>
  <h1 align="center"><a href="https://epicreact.dev/hooks">🎣 React Hooks 🚀 EpicReact.Dev</a></h1>
  <strong>
    Learn the ins and outs of React Hooks.
  </strong>
  <p>
    I will take you on a deep dive into
    React Hooks, and show you what you need to know to start using them in your
    applications right away.
  </p>

  <a href="https://epicreact.dev">
    <img
      alt="Learn React from Start to Finish"
      src="https://kentcdodds.com/images/epicreact-promo/er-1.gif"
    />
  </a>
</div>

<hr />

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![All Contributors][all-contributors-badge]](#contributors-)
[![GPL 3.0 License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
[![Gitpod ready-to-code][gitpod-badge]](https://gitpod.io/#https://github.com/kentcdodds/react-hooks)
<!-- prettier-ignore-end -->

## Prerequisites

- Watch my talk
  [Why React Hooks](https://www.youtube.com/watch?v=zWsZcBiwgVE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
  (35 minutes)

> NOTE: The EpicReact.dev videos were recorded with React version ^16.13 and all
> material in this repo has been updated to React version ^18. Differences are
> minor and any relevant differences are noted in the instructions.


## Quick start

It's recommended you run everything in the same environment you work in every
day, but if you don't want to set up the repository locally, you can get started
in one click with [Gitpod](https://gitpod.io),
[CodeSandbox](https://codesandbox.io/s/github/kentcdodds/react-hooks), or
by following the [video demo](https://www.youtube.com/watch?v=gCoVJm3hGk4)
instructions for [GitHub Codespaces](https://github.com/features/codespaces).

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/kentcdodds/react-hooks)

For a local development environment, follow the instructions below

## System Requirements

- [git][git] v2.13 or greater
- [NodeJS][node] `14 || 16 || 18`
- [npm][npm] v6 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Setup

> If you want to commit and push your work as you go, you'll want to
> [fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo)
> first and then clone your fork rather than this repo directly.

After you've made sure to have the correct things (and versions) installed, you
should be able to just run a few commands to get set up:

```shell
git clone https://github.com/kentcdodds/react-hooks.git
cd react-hooks
node setup
```

This may take a few minutes. **It will ask you for your email.** This is
optional and just automatically adds your email to the links in the project to
make filling out some forms easier.

If you get any errors, please read through them and see if you can find out what
the problem is. If you can't work it out on your own then please [file an
issue][issue] and provide _all_ the output from the commands you ran (even if
it's a lot).

If you can't get the setup script to work, then just make sure you have the
right versions of the requirements listed above, and run the following commands:

```shell
npm install
npm run validate
```

If you are still unable to fix issues and you know how to use Docker 🐳 you can
setup the project with the following command:

```shell
docker-compose up
```

## Running the app

To get the app up and running (and really see if it worked), run:

```shell
npm start
```

This should start up your browser. If you're familiar, this is a standard
[react-scripts](https://create-react-app.dev/) application.

You can also open
[the deployment of the app on Netlify](https://react-hooks.netlify.app/).

## Running the tests

```shell
npm test
```

This will start [Jest](https://jestjs.io/) in watch mode. Read the output and
play around with it. The tests are there to help you reach the final version,
however _sometimes_ you can accomplish the task and the tests still fail if you
implement things differently than I do in my solution, so don't look to them as
a complete authority.

### Exercises

- `src/exercise/00.md`: Background, Exercise Instructions, Extra Credit
- `src/exercise/00.js`: Exercise with Emoji helpers
- `src/__tests__/00.js`: Tests
- `src/final/00.js`: Final version
- `src/final/00.extra-0.js`: Final version of extra credit

The purpose of the exercise is **not** for you to work through all the material.
It's intended to get your brain thinking about the right questions to ask me as
_I_ walk through the material.

### Helpful Emoji 🐨 💰 💯 📝 🦉 📜 💣 💪 🏁 👨‍💼 🚨

Each exercise has comments in it to help you get through the exercise. These fun
emoji characters are here to help you.

- **Kody the Koala** 🐨 will tell you when there's something specific you should
  do
- **Marty the Money Bag** 💰 will give you specific tips (and sometimes code)
  along the way
- **Hannah the Hundred** 💯 will give you extra challenges you can do if you
  finish the exercises early.
- **Nancy the Notepad** 📝 will encourage you to take notes on what you're
  learning
- **Olivia the Owl** 🦉 will give you useful tidbits/best practice notes and a
  link for elaboration and feedback.
- **Dominic the Document** 📜 will give you links to useful documentation
- **Berry the Bomb** 💣 will be hanging around anywhere you need to blow stuff
  up (delete code)
- **Matthew the Muscle** 💪 will indicate that you're working with an exercise
- **Chuck the Checkered Flag** 🏁 will indicate that you're working with a final
- **Peter the Product Manager** 👨‍💼 helps us know what our users want
- **Alfred the Alert** 🚨 will occasionally show up in the test failures with
  potential explanations for why the tests are failing.

## Contributors

Thanks goes to these wonderful people
([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/react-hooks/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/react-hooks/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://tsnieman.net/"><img src="https://avatars3.githubusercontent.com/u/595711?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tyler Nieman</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=tsnieman" title="Code">💻</a> <a href="https://github.com/kentcdodds/react-hooks/commits?author=tsnieman" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/mplis"><img src="https://avatars0.githubusercontent.com/u/1382377?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mike Plis</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=mplis" title="Code">💻</a> <a href="https://github.com/kentcdodds/react-hooks/commits?author=mplis" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://stackshare.io/jdorfman/decisions"><img src="https://avatars1.githubusercontent.com/u/398230?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Justin Dorfman</b></sub></a><br /><a href="#fundingFinding-jdorfman" title="Funding Finding">🔍</a></td>
    <td align="center"><a href="http://algus.ninja"><img src="https://avatars1.githubusercontent.com/u/818856?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Carlos Pérez Gutiérrez</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=AlgusDark" title="Code">💻</a></td>
    <td align="center"><a href="http://charliestras.me"><img src="https://avatars2.githubusercontent.com/u/10193500?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Charlie Stras</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=CharlieStras" title="Documentation">📖</a> <a href="https://github.com/kentcdodds/react-hooks/commits?author=CharlieStras" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lideo"><img src="https://avatars3.githubusercontent.com/u/1573567?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lide</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=lideo" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/marcosvega91"><img src="https://avatars2.githubusercontent.com/u/5365582?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marco Moretti</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=marcosvega91" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gugol2"><img src="https://avatars0.githubusercontent.com/u/4933016?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Watchmaker</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/issues?q=author%3Agugol2" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://dschapman.com"><img src="https://avatars3.githubusercontent.com/u/36767987?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel Chapman</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=dschapman" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/flofehrenbacher"><img src="https://avatars0.githubusercontent.com/u/18660708?v=4?s=100" width="100px;" alt=""/><br /><sub><b>flofehrenbacher</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=flofehrenbacher" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/pritamsangani/"><img src="https://avatars3.githubusercontent.com/u/22857896?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pritam Sangani</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=PritamSangani" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/emzoumpo"><img src="https://avatars2.githubusercontent.com/u/2103443?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Emmanouil Zoumpoulakis</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=emzoumpo" title="Documentation">📖</a></td>
    <td align="center"><a href="http://peter.hozak.info/"><img src="https://avatars0.githubusercontent.com/u/1087670?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Peter Hozák</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=Aprillion" title="Code">💻</a> <a href="https://github.com/kentcdodds/react-hooks/commits?author=Aprillion" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/timobleeker"><img src="https://avatars0.githubusercontent.com/u/2723586?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Timo</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=timobleeker" title="Documentation">📖</a></td>
    <td align="center"><a href="http://thacher.co"><img src="https://avatars1.githubusercontent.com/u/12368025?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thacher Hussain</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=thacherhussain" title="Documentation">📖</a></td>
    <td align="center"><a href="https://magrippis.com"><img src="https://avatars0.githubusercontent.com/u/3502800?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Johnny Magrippis</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=jmagrippis" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/apolakipso"><img src="https://avatars2.githubusercontent.com/u/494674?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Apola Kipso</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=apolakipso" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Snaptags"><img src="https://avatars1.githubusercontent.com/u/1249745?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Markus Lasermann</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=Snaptags" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/degeens"><img src="https://avatars2.githubusercontent.com/u/33414262?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stijn Geens</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=degeens" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/nativedone"><img src="https://avatars2.githubusercontent.com/u/20998754?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adeildo Amorim</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=nativedone" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/thegoodsheppard"><img src="https://avatars1.githubusercontent.com/u/13774377?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Greg Sheppard</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=thegoodsheppard" title="Documentation">📖</a></td>
    <td align="center"><a href="https://rafaeldavis.dev"><img src="https://avatars0.githubusercontent.com/u/6822714?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rafael D. Hernandez</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=RafaelDavisH" title="Code">💻</a></td>
    <td align="center"><a href="http://dallascarraher.dev"><img src="https://avatars2.githubusercontent.com/u/4131693?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dallas Carraher</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=DallasCarraher" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/roni-castro"><img src="https://avatars3.githubusercontent.com/u/24610813?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roni Castro</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=roni-castro" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/thebrengun"><img src="https://avatars2.githubusercontent.com/u/15270595?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brennan</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=thebrengun" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.daleseo.com"><img src="https://avatars1.githubusercontent.com/u/5466341?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dale Seo</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=DaleSeo" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://michaeldeboey.be"><img src="https://avatars3.githubusercontent.com/u/6643991?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michaël De Boey</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=MichaelDeBoey" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://bobbywarner.com"><img src="https://avatars0.githubusercontent.com/u/554961?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bobby Warner</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=bobbywarner" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/douglance"><img src="https://avatars2.githubusercontent.com/u/4741454?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Doug Lance</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=douglance" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/nekhaevskiy"><img src="https://avatars0.githubusercontent.com/u/15379100?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yury Nekhaevskiy</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=nekhaevskiy" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/mansn"><img src="https://avatars0.githubusercontent.com/u/4518977?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Måns Nilsson</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=mansn" title="Documentation">📖</a></td>
    <td align="center"><a href="https://clarkwinters.com"><img src="https://avatars2.githubusercontent.com/u/40615752?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Clark Winters</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/issues?q=author%3Acwinters8" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://omarhoumz.com/"><img src="https://avatars2.githubusercontent.com/u/40954879?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Omar Houmz</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=omarhoumz" title="Code">💻</a></td>
    <td align="center"><a href="https://suddenlyGiovanni.dev"><img src="https://avatars2.githubusercontent.com/u/15946771?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Giovanni Ravalico</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=suddenlyGiovanni" title="Code">💻</a> <a href="#ideas-suddenlyGiovanni" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Segebre"><img src="https://avatars3.githubusercontent.com/u/10774915?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Juan Enrique Segebre Zaghmout</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=Segebre" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/johnalexanderferguson/"><img src="https://avatars.githubusercontent.com/u/30883573?v=4?s=100" width="100px;" alt=""/><br /><sub><b>John Alexander Ferguson</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=Alferguson" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://trentschneweis.com"><img src="https://avatars.githubusercontent.com/u/10525549?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Trent Schneweis</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=trentschnee" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lionheart"><img src="https://avatars.githubusercontent.com/u/38447?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dan Loewenherz</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=dlo" title="Code">💻</a></td>
    <td align="center"><a href="https://prabhuwali.me/"><img src="https://avatars.githubusercontent.com/u/40115160?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shivaprabhu</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=shivaprabhu" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.jacobparis.com/"><img src="https://avatars.githubusercontent.com/u/5633704?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jacob Paris</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=JacobParis" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Eik-S"><img src="https://avatars.githubusercontent.com/u/9152141?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eike Mücksch</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=Eik-S" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://pavlos.dev"><img src="https://avatars.githubusercontent.com/u/100233?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pavlos Vinieratos</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=pvinis" title="Documentation">📖</a></td>
    <td align="center"><a href="https://mokajima.com/"><img src="https://avatars.githubusercontent.com/u/10166985?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Misaki Okajima</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=mokajima" title="Code">💻</a> <a href="https://github.com/kentcdodds/react-hooks/commits?author=mokajima" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/marioleed"><img src="https://avatars.githubusercontent.com/u/1763448?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mario Sannum</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=marioleed" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jaquinocode"><img src="https://avatars.githubusercontent.com/u/28276675?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jaquinocode</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/issues?q=author%3Ajaquinocode" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Insidiae"><img src="https://avatars.githubusercontent.com/u/28495550?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kobe Ruado</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=Insidiae" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/prasanthlouis/"><img src="https://avatars.githubusercontent.com/u/8705429?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Prasanth Louis</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=prasanthlouis" title="Documentation">📖</a></td>
    <td align="center"><a href="https://stackoverflow.com/users/5411817/sherylhohman?tab=topactivity"><img src="https://avatars.githubusercontent.com/u/8204778?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sheryl Hohman</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=SherylHohman" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.victoriavasys.com/"><img src="https://avatars.githubusercontent.com/u/10079657?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Victoria Vasys</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=VictoriaVasys" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/ImElan"><img src="https://avatars.githubusercontent.com/u/59192383?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Elan</b></sub></a><br /><a href="https://github.com/kentcdodds/react-hooks/commits?author=ImElan" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind welcome!

## Workshop Feedback

Each exercise has an Elaboration and Feedback link. Please fill that out after
the exercise and instruction.

At the end of the workshop, please go to this URL to give overall feedback.
Thank you! https://kcd.im/rh-ws-feedback

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[build-badge]: https://img.shields.io/github/workflow/status/kentcdodds/react-hooks/validate/main?logo=github&style=flat-square
[build]: https://github.com/kentcdodds/react-hooks/actions?query=workflow%3Avalidate
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/kentcdodds/react-hooks/blob/main/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[gitpod-badge]: https://img.shields.io/badge/Gitpod-ready--to--code-908a85?logo=gitpod
[coc]: https://github.com/kentcdodds/react-hooks/blob/main/CODE_OF_CONDUCT.md
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[all-contributors-badge]: https://img.shields.io/github/all-contributors/kentcdodds/react-hooks?color=orange&style=flat-square
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/kentcdodds/react-hooks/issues/new
<!-- prettier-ignore-end -->
