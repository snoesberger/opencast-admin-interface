Opencast Admin UI
=================

The Opencast Admin UI is a graphical interface included with Opencast
that allows admins to easily manage their Opencast instance.

Development and testing
-----------------------

To get a local copy of the admin UI to test or develop on, you can do the following:

```sh
git clone git@github.com:opencast/admin-interface.git admin-interface-demo
cd admin-interface-demo
git switch my-branch  # or otherwise check out, pull, merge, etc. whatever branch you want to test/hack on
npm ci
```

You can now run a local instance of the UI by saying

```sh
npm start
```

This runs a development server at `http://localhost:3000`, serving a development build
of the admin UI, and automatically opens a browser tab pointed to it.
The build and the browser tab should automatically refresh on every change you make
to the codebase.

The default target for API calls is `https://develop.opencast.org` to which the development server will proxy all the backend request,
authenticating them as user `admin` with password `opencast`.

If you want to work with a different Opencast and/or user, you can change the command thusly:

```sh
PROXY_TARGET=http://localhost:8080 npm start
```

Here, `PROXY_TARGET` is the target URL of the Opencast instance you want to test against.

By default, this tries to authenticate backend requests using HTTP Basic Auth
as user `admin` with the default password `opencast`.
If you want to authenticate using different credentials, you can specify them
in the `PROXY_AUTH` variable in the format `user:password`, as in

```sh
PROXY_TARGET=http://localhost:8080 PROXY_AUTH=jdoe:aligator3 npm start
```

Similarly, if you want to change the port the development server itself runs at,
you can specify an alternative port in the `PORT` environment variable.

If you aim to test against a remote server without using a proxy, you have the option to configure the target server with the `VITE_TEST_SERVER_URL`, and the `VITE_TEST_SERVER_AUTH` environment variables while using the node development mode:

```sh
NODE_ENV=development VITE_TEST_SERVER_URL="https://develop.opencast.org" VITE_TEST_SERVER_AUTH="admin:opencast" npm start
```


Admin releases
--------------

The admin module no longer cuts releases itself.  Opencast's release manager will create tags as appropriate and push
as part of the release process.


Translating the Admin Interface
-------------------------------

You can help translate the Opencast Admin UI to your language on [crowdin.com/project/opencast-admin-interface](https://crowdin.com/project/opencast-admin-interface). Simply request to join the project on Crowdin and start translating. If you are interested in translating a language that is not a target language right now, please create [a GitHub issue](https://github.com/opencast/admin-interface/issues) and we will add the language.

This project follows the general form of [Opencast's Localization Process](https://docs.opencast.org/develop/developer/#participate/localization/), especially regarding what happens when you need to [change an existing translation key](https://docs.opencast.org/develop/developer/#participate/localization/#i-need-to-update-the-wording-of-the-source-translation-what-happens).  Any questions not answered there should be referred to the mailing lists!


Configuration
-------------

The Admin UI frontend cannot be directly configured. Rather, it adapts to the
various configurations in the Opencast backend. Fore more information, take a look
at [Opencast's documentation](https://docs.opencast.org).


Admin Repo History
------------------

As part of https://github.com/orgs/opencast/discussions/7277 we decided to rewrite the entire history of this
repository.  This was done because it contained the *entire* history of Opencast into the Opencast 14 era.  All
repository history prior to the addition of this commit should be considered rewritten history, however there should
be no function changes.  The previous tags have been rewritten, but the releases in this GitHub repository have not.
This means that the hash attached to a given release prior to 2026-03-26 will *not* match, however the source will
aside from the changes we made.
