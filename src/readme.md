# Architecture

Organizing an Object-Relational Mapping (ORM) library into layers involves creating clear distinctions between different components or responsibilities, making it easier to understand and manage the code. This README provides an overview of the architecture of the library organized into layers, with a focus on Promises in JavaScript.

## Architecture Overview

### Presentation Layer

In the Presentation Layer, we provide a user-friendly interface to interact with the ORM. The `Model` class offers the following methods:

- `findById(id)`: Allows users to find a record in a specified table by its ID.
- `create(user)`: Enables users to create a new record in a specified table.
- etc...

#### features
- Query builder
  - Components for constructing database queries. This includes classes for creating SELECT, INSERT, UPDATE, and DELETE queries in an object-oriented way.
- Model Difinition
  - Classes and interfaces for defining database models. These classes represent tables and their relationships, including fields and their data types.
- API
  - Public methods and classes that users of the library will interact with. This layer defines how users create, manipulate, and query database records.
- Triggers
  - Implement triggers at the Presentation Layer to allow users to define custom actions or events before or after certain ORM operations.


### Business Logic Layer
The Business Logic Layer contains the core logic for interacting with  `Data Access Layer`. In this example, we have the ORM class responsible for querying the database. It includes the following methods:


  example etc...

#### features
- Validator
  - Components for validating data before it send into `Data Access Layer`. Validation can include checking data types, required fields, and custom validation
- Model Extensions
  - Classes that allow developers to add custom methods or behaviors to models.
- Model Manager
  - Components for managing model definitions and their relationships. This might include registering models, defining model-to-model relationships, and handling schema migrations.
- Triggers
  - Implement triggers at the Business Logic Layer to execute custom logic before or after certain ORM operations.

### Data Access Layer
The Data Access Layer is responsible for handling actual database queries.

#### features

 - Database Connection Management
   - Classes or components for establishing and managing database connections. This may include connection pooling and handling different types of database drivers.
 - DriverAdapters
   - If your ORM library supports multiple databases, you may need adapters or drivers for each supported database system.
 - Schema Migrations
   - Components for handling database schema migrations. This includes creating, updating, and rolling back changes to the database schema as models change.
 - Triggers
   - Implement triggers at the Data Access Layer to execute custom logic before or after specific database operations.

This example demonstrates how this library is organized into layers, separating concerns and making it more maintainable and extensible.


### Web Worker Layer
The Web worker layer enabled offload CPU-intensive tasks to a separate thread, enhancing performance and responsiveness.

- Parallel Database Queries
  - perform multiple queries simultaneously
- Enhanced Scalability
  - utilize additional Web Workers to distribute the workload across multiple threads, taking full advantage of multi-core processors.
- Data Synchronization and Serialization
  -  Establish data transfer protocols and serialization methods.
- Triggers
  - Implement triggers at the Web Worker Layer to execute custom logic in a parallelized environment.

By integrating a Web Worker, you can enhance the performance and scalability of your ORM library while providing a smoother user experience.


### Configuration Layer
The configuration layer allows users to customize the behavior of the ORM library. This layer might include options for specifying database connection details, logging settings, and more.
#### features
 - Configuration Options
   - Classes or components for specifying configuration options, such as database connection settings, logging levels, and custom behaviors.
 - Configuration Management
   - Components for loading, validating, and applying user-defined configurations to the ORM library.
 - Triggers
   - Implement triggers at the Configuration Layer to execute custom logic based on configuration events.
This example demonstrates how this library is organized into layers, separating concerns and making it more maintainable and extensible.



### Utility Layer
Implement logging to help with debugging and monitoring the library's behavior.
#### features
 - Error Handling
   - Implement logging to help with debugging and monitoring the library's behavior.
 - Logging
   - Implement logging to help with debugging and monitoring the library's behavior.
 - Helpers
   - Utility classes or functions that provide common functionality used throughout the library.
 - Triggers
   - Implement triggers at the Utility Layer to execute custom logic during error handling or other utility-related events.
___________________________________________
This example demonstrates how this library is organized into layers, separating concerns and making it more maintainable and extensible.
