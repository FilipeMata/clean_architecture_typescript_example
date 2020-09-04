# Clean Architecture with Typescript
This repository provides an implementation (or at least an attempt) of Uncle Bob's Clean Architecture with Typescript.


![CleanArchitecture](https://user-images.githubusercontent.com/10949632/92665934-3390a380-f2de-11ea-8c63-5447e5773e2d.jpg)

Basically there is a folder representing each required layer:

- **entities**: This folder contains all enterprise business rules. It's represented by domain classes with most critical business rules.
- **use-cases**: This folder contains all aplication business rules. It's encapsulated in modules containing the use case interactors and its ports (one specific use case gateway interface and/or one specific use case presenter interface)
- **adapters**: This folder contains all kind of code that adapts interfaces most familiar to infrastructure layer to interfaces most familiar do use case layer. For example, sometimes it's needed to adapt one or more data access classes to an specific use case gateway interface.
- **infrastructure**: This folder contains all libraries, frameworks and drivers needed by the aplication. It's less important aplication layer, always depending on adapter's layer.
- **shared**: Is where I put my helper functions, patterns and objects used by the entire aplication. It's important to say that every code inside this folder is tottaly independent of implementation details.
