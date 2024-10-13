<div>
  <h1 align="center"><a href="https://www.epicweb.dev/workshops">🎣 React Hooks</a></h1>
  <strong>
    Understand the building blocks of React
  </strong>
  <p>
    Go on a deep dive into React Hooks, and find you what you need to know to
    start using them in your applications right away.
  </p>
</div>

<hr />

<div align="center">
  <a
    alt="Epic Web logo with the words Deployed Version"
    href="https://hooks.epicreact.dev"
  >
    <img
      width="300px"
      src="https://github-production-user-asset-6210df.s3.amazonaws.com/1500684/254000390-447a3559-e7b9-4918-947a-1b326d239771.png"
    />
  </a>
</div>

<hr />

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![GPL 3.0 License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## Prerequisites

- Experience with
  [React fundamentals](https://github.com/epicweb-dev/react-fundamentals)

## Pre-workshop Resources

Here are some resources you can read before taking the workshop to get you up to
speed on some of the tools and concepts we'll be covering:

- [Why React Hooks](https://www.youtube.com/watch?v=zWsZcBiwgVE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
  (35 minutes)
- [Getting Closure on Hooks](https://www.swyx.io/getting-closure-on-hooks/)
- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)

## System Requirements

- [git][git] v2.18 or greater
- [NodeJS][node] v20 or greater
- [npm][npm] v8 or greater

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

This is a pretty large project (it's actually many apps in one) so it can take
several minutes to get everything set up the first time. Please have a strong
network connection before running the setup and grab a snack.

Follow these steps to get this set up:

```sh nonumber
git clone --depth 1 https://github.com/epicweb-dev/react-hooks.git
cd react-hooks
npm run setup
```

If you experience errors here, please open [an issue][issue] with as many
details as you can offer.

## Starting the app

Once you have the setup finished, you can start the app with:

```
npm start
```

## The Workshop App

Learn all about the workshop app on the
[Epic Web Getting Started Guide](https://www.epicweb.dev/get-started).

[![Kent with the workshop app in the background](https://github-production-user-asset-6210df.s3.amazonaws.com/1500684/280407082-0e012138-e01d-45d5-abf2-86ffe5d03c69.png)](https://www.epicweb.dev/get-started)

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[build-badge]: https://img.shields.io/github/actions/workflow/status/epicweb-dev/react-hooks/validate.yml?branch=main&logo=github&style=flat-square
[build]: https://github.com/epicweb-dev/react-hooks/actions?query=workflow%3Avalidate
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/epicweb-dev/react-hooks/blob/main/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://kentcdodds.com/conduct
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/epicweb-dev/react-hooks/issues/new
<!-- prettier-ignore-end -->
