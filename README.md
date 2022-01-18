# Clean Architecture with Typescript
This repository provides an implementation (or at least an attempt) of Uncle Bob's Clean Architecture with Typescript.

![CleanArchitecture](https://user-images.githubusercontent.com/10949632/92665934-3390a380-f2de-11ea-8c63-5447e5773e2d.jpg)

Basically there is a folder representing each required layer:

- **entities**: This folder contains all enterprise business rules. It's represented by domain classes with most critical business rules.
- **use-cases**: This folder contains all aplication business rules. It's encapsulated in modules containing the use case interactors and its ports (one specific use case gateway interface and/or one specific use case presenter interface)
- **adapters**: This folder contains all kind of code that adapts interfaces most familiar to infrastructure layer to interfaces most familiar do use case layer. For example, sometimes it's needed to adapt one or more data access classes to an specific use case gateway interface.
- **infrastructure**: This folder contains all libraries, frameworks and drivers needed by the aplication. It's less important aplication layer, always depending on adapter's layer.


## Execution Instructions

To configure and execute this project, the [Docker][docker] framework was used. And for the database [MySQL][mysql] was chosen.

### Initial configurations

On the first stage, it is important to create the database in which store our data for the app.

```
make database
```

On the second stage, we will build the required images from Dockerfile/Docker Compose to initialize its contexts(network, port, volume)

```
make build
```

After having our database properly created, it is necessary to run a setup. At this point we are executing the migrations, seeds and building the packages we need to run the App.

```
make setup
```

### Running the App

Finally, after configuring the project, you can start up the project running following command.

```
make up logs
```


[mysql]:https://www.mysql.com/
[docker]:https://www.docker.com/