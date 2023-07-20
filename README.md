
# Notion-Clone API: Robust TypeScript Backend with Clean Architecture, DDD, and Test-Driven Development

<p align="center">
  <a href="https://github.com/dyarleniber/nyt-movie-reviews/actions?query=workflow%3ACI%2FCD">
    <img alt="CI/CD" src="https://github.com/dyarleniber/nyt-movie-reviews/workflows/CI/CD/badge.svg">
  </a>
  <a href="https://codecov.io/gh/dyarleniber/nyt-movie-reviews">
    <img alt="Coverage" src="https://img.shields.io/codecov/c/github/dyarleniber/nyt-movie-reviews">
  </a>
  <a href="https://github.com/dyarleniber/nyt-movie-reviews/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/dyarleniber/nyt-movie-reviews?label=license">
  </a>
</p>


The Notion-Clone API is a TypeScript-based backend project that serves as a clone of the popular note-taking and collaboration application, Notion. This API is designed to handle authentication and authorization while providing similar functionalities to Notion, allowing users to create, manage, and collaborate on various types of content such as notes, databases, and task lists. The project follows best practices in software development, including Clean Architecture, Domain Driven Design (DDD), and Test Driven Development (TDD), ensuring a well-structured, maintainable, and extensible codebase.


## Features

- User Authentication: Secure user registration and login processes with hashed passwords and token-based authentication.
- Content Creation and Management: Create, update, and delete various content types, including notes, lists, media, superchared tables, task lists etc.
- Collaboration: Enable users to collaborate on shared content, providing granular access control and permissions.
- Rich Text Support: Allow users to create and edit content with rich text formatting options.
- Security: Ensure data security and privacy with robust authentication and authorization mechanisms.
- upload images for profile picture, cover photo and in text editor.
- robust schema validation for validating input data.
- 99% Test Coverage.
- Authentication using HTTP only cookies.
- Testing & TDD.
- API Documentation.
## Architecture

The app was built based on the Clean Architecture, SOLID principles, and Domain-Driven Design best practices using TypeScript.

### Clean architecture
The Clean Architecture is a way to separate the concerns of everything that goes into building complex enterprise applications. 
![clean-architecture](https://github.com/shreyasmanolkar/notion-api/assets/80336980/e2cd9204-9a92-4f20-a207-6f40e6d1d122)


To separate concerns, this application was built with a Clean Architecture. It is divided into Domain, Application, and Infrastructure layers: There is also a Main layer, which is the entry point of the API.

There are unit and integration tests covering each layer. The main tool used for testing is Jest.

To cover the Main layer, integration tests were created to test the HTTP requests of the API. That way, I can assure that the Express server is working correctly, all the adapters are also working as expected, and all the dependencies are being injected correctly. For all the other layers, unit tests were created, using mocks and stubs to mock the dependencies.

And for testing the MongoDB, an in-memory implementation was used as a Jest preset.

#### Domain Layer
The Domain layer is the layer that contains the business logic of the application. It contains the Entities, which are the classes that represent the data of the API. This layer is isolated from outer layers concerns.

Due to limited time, I decided to take a simpler approach here. And, although some Domain-Driven Design patterns have been implemented, such as DTOs, Mappers , Entities, and the Repository pattern. Some other DDD patterns could also be implemented to enrich the application domain, and avoid illegal operations and illegal states.

Such as Value Objects, they could be used to define the minimum and maximum size, and the standards that the content of the post must follow. Not only that, but they could also be used to override all (or most) of the primitive types, such as strings, numbers, and booleans.

#### Application Layer

The Application layer is the layer that contains the application specific business rules. It implements all the use cases of the API, it uses the domain classes, but it is isolated from the details and implementation of outer layers, such as databases, adapters, etc. This layer just holds interfaces to interact with the outside world.

I also defined interfaces for each use case, in order to make the application more testable, since I'm using these interfaces to create stubs for testing the controllers and middlewares in the infrastructure layer.

#### Infrastructure Layer

The Infrastructure layer is the layer that contains all the concrete implementations of the application. It contains repositories, adapters, controllers, middlewares, etc. It also contains the validators, which are used to validate the data of the controllers.

#### Main Layer

The Main layer is the entry point of the application. It is the layer that contains the Express server, and where all the routes are defined. In this layer I also compose all the controllers, middlewares, and use cases, injecting the dependencies that are needed, since I am not using any dependency injection container.


## API Reference

For detailed information on each API endpoint and how to interact with the Notion Clone API, please refer to the comprehensive API documentation.

**API Documentation:** [Notion Clone API Documentation](https://documenter.getpostman.com/view/20114396/2s946chEcc#0324f17a-7d4a-4dcc-943a-6082f10aae96)

The API documentation contains:

- Detailed descriptions of each API endpoint, including the purpose and functionality.
- Example requests and responses for better understanding of API usage.
- Instructions on authentication and obtaining API keys for secure access.
- Overview of the data models used in the API.
- Code snippets and usage examples to help you get started quickly.

By referring to the API documentation, you can seamlessly integrate the Notion Clone API into your frontend application and leverage its powerful features for organizing and collaborating on information.
## Business Logic

Notion is a powerful framework designed to empower users by providing unrestricted information management and control. At the core of Notion's architecture is the concept of blocks. Everything in Notion, be it text, images, lists, or even entire pages, is represented as a block. These dynamic units of information can be freely rearranged and converted into different block types, offering users precise control over their content.

Pages in Notion are collections of various blocks, each containing specific information based on its block type. They play a crucial role in organizing and managing data within databases. Databases in Notion offer different views such as kanban boards, tables, calendars, timelines, etc., with the smallest unit being a page. Each page in a database possesses properties that enable the storage of specific information, and these properties determine the desired view.

Moreover, Notion provides the concept of workspaces, where users can create multiple protected environments for collaboration. Workspaces accommodate numerous members and team spaces, granting access based on permission levels, ensuring a secure environment for collaboration and information management.

By harnessing the flexibility of blocks, the organizational power of pages, and the collaboration features of workspaces, Notion offers an unparalleled experience for users seeking comprehensive control over their information.

this is the core business logic represented in class diagram.

![notion-clone-busincess-logic drawio](https://github.com/shreyasmanolkar/notion-api/assets/80336980/1e506cbd-a0b1-4206-8415-0fc6e9e960af)


## Run Locally

Clone the project

```bash
  git clone git@github.com:shreyasmanolkar/notion-api.git
```

Go to the project directory

```bash
  cd notion-api
```

Install dependencies

```bash
  npm install
```
Create build

```bash
  npm run build
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```x

To run test coverage report, run the following command

```bash
  npm run test:ci
```

To run single unit test, run the following command

update: package.json: 

```bash
    "test:only": "jest -- -t <test file name>",
```


"test:only": "jest -- -t SignUpController.spec.ts",

```bash
  npm run test:only
```
## Screenshots

code coverage:
![screen-2023-07-12-19-14-37](https://github.com/shreyasmanolkar/notion-api/assets/80336980/b8e058c9-2422-407e-856b-11a0d19b9393)
![screen-2023-07-12-18-23-54](https://github.com/shreyasmanolkar/notion-api/assets/80336980/c334176b-fb3f-4ce9-927f-ba77d92a5cce)


## License

This project is under the MIT license. See the [LICENSE](https://github.com/shreyasmanolkar/notion-api/blob/main/LICENSE) for more information.

---


