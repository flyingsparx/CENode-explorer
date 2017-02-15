# CENode Explorer

* [Introduction](#introduction)
* [Technical details](#technical-details)
* [Running CENode Explorer](#running-cenode-explorer-yourself)
  * [Using Docker](#using-docker)
  * [Running the app directly](#running-the-app-directly)
* [Developing with CENode Explorer](#developing-with-cenode-explorer)

## Introduction

CENode Explorer is a simple web-based graphical front-end to CENode. In particular:

* Launching CENode instances on the server
* Managing CENode instances through CE
* Navigating an instance's knowledge base and conceptual model
* Other utilities

This project is simply a wrapper around the CENode library's inbuilt HTTP APIs. Please see the following section for further details on this.

This project is written using [Vue.js](https://vuejs.org) with a small Node backend to manage starting and stopping CENode instances.

## Technical details

It is important to note that this project adds no extra real functionality aside from those around starting and stopping CENode instances. All interaction with specific instances is carried out directly with the node over HTTP.

For example, CENode Explorer, running on port 3000, might be used to start an instance with an agent called 'Moira' on port 4444. Once started, further interaction with the node is done directly on port 4444 using the instance's own restful APIs.

## Running CENode Explorer yourself

This section describes how CENode Explorer can be run, and we cover two approaches:

* Using Docker
* Running the app directly

### Using Docker

#### Using the pre-existing CENode Explorer Docker image

If you have Docker installed, then this is probably the simplest approach to using CENode Explorer yourself. To get Docker installed on your system, and to learn the basics, please refer to the Docker [documentation](https://docs.docker.com).

Once Docker is installed, simply run the app with:

```bash
$ docker run -p 8080:3000 flyingsparx/cenode-exolorer
```

This command will pull our pre-built `cenode-explorer` image from the Docker hub and run it. The first time you run it will take longer as the base images will need to be downloaded and extracted to your local machine.

The `-p` flag tells Docker to map the application port within Docker (3000) onto port 8080 on the host machine, meaning you can now navigate to [localhost:8080](http://localhost:8080) (or whichever host/port combo is appropriate for your use) to view the app.

This particular point poses a problem, since although we know the default port number of the CENode Explorer app itself (3000), we don't know which ports subsequent CENode instances will be available at yet (since they haven't been launched).

Therefore, you may need to map additional ports in order to launch and access CENode instances over HTTP:

```bash
$ docker run -p 8080:3000 -p 2222:2222 -p 3333:3333 flyingsparx/cenode-explorer
```

On Linux systems, instead of using the `-p` flags, you can use `--network=host`, which allows Docker to bind any of the ports you eventually use without needing to 'predict' them. If you are not using a Linux system, and don't want to have to predict ports in this way, then please see the 'Running the app directly' section below.

#### Creating your own Docker image

Once Docker is installed (see previous section), then you can build your own image using the included Dockerfile:

```bash
$ git clone git@github.com:flyingsparx/CENode-explorer.git && cd CENode-explorer
$ docker build -t my-cenode-explorer .
```

And then you can run your own image using:

```bash
$ docker run -p 8080:3000 my-cenode-explorer
```

### Running the app directly

For this you will need to install [Node](https://nodejs.org/en) (and NPM) onto your system first.

Once installed, clone and change into this repository:

```bash
$ git clone git@github.com:flyingsparx/CENode-explorer.git && cd CENode-explorer
```

Install required dependencies:

```bash
$ npm install
```

Build the source files into production-ready web-viewable JavaScript:

```bash
$ npm run build
```

Start the app:

```bash
$ node app
```

And then visit [localhost:3000](http://localhost:3000) in your browser to view the app.

## Developing with CENode Explorer

To run the development environment, then carry out the steps above (in 'Running the app directly').

However, instead of running `npm run build` to generate production-ready JavaScript, use the following command to automatically watch and rebuild your source files as you modify them and to report errors properly to the console:

```bash
$ npm run watch
```

Then run the Node app (using `node app`) in another terminal emulator window to start the server and visit the app using the method described.
