README for version 0.1
====

This project is an idle incremental game where players create their own guild of adventurers. Players can recruit heroes, send them on quests, and more in this browser-based game.
====

Architural Overview and Decisions
----
My goal with this project is to create a scalable and maintainable codebase that can be easily extended with new features due to the architectural decisions made early on.

As of the creation of this project, until the features are completed, the MVP will focus on the following functionalities:
-Creating a Guild
-Recruiting Members
-Adding them to the Guild Roster
-Removing them from the Guild Roster

The above are the simple features that will be available to the player in the MVP. Future features will include:
-Sending Guild Members on Quests
-Training Guild Members
-Equipping Guild Members with Items
-Managing Resources

----

High-Level Architecture
The project is structured using a modular architecture, separating pieces into different layers to promote separation of concerns and maintainability.
1.Domain Layer: This layer contains the core business logic and entities of the game, such as Guild, Member, Quest, and Item. Each entity is represented by a class with its own properties and methods.
2.Application Layer: This layer contains services that handle interatiocs between the domain layer and the UI layer.
3.UI Layer: This layer contains the user interface components, including HTML, CSS, and JavaScript (TypeScript) files that render the game in the browser and handle user interactions.

Domain Model
----
Guild: Represents a guild with properties like name, members, and resources. Methods include addMember and removeMember.
Member: Represents a guild member with properties like name, upkeep and status.

Right now, there are simple invariants to test within the domain layer:
-A names cannot be empty or null, and must be unique, numers cannot be out of bound, etc.

Core Use Cases
----
Right now, the MVP looks like a CRUD application, because it is!
I wanted to start with those functionalities since they are the backbone of the game and when I have the MVP, and then a nice Vertical Slice, I can start adding more complex features.

1.Create Guild: Allows players to create a new guild by providing a name.
2.Recruit Member: Allows players to recruit new members to their guild by providing a name and upkeep cost.
3.Add Member to Roster: Adds a recruited member to the guild's roster.
4.Remove Member from Roster: Removes a member from the guild's roster.

State Management
----
In terms of state management, I've chosen to go the Immutable route, as opposed to mutating existing objects. This decision was made to ensure that the state of the game remains predictable and easier to debug.
Each time a change is made to the guild or its members, a new instance of the affected object is created with the updated state. This approach helps prevent unintended side effects and makes it easier to track changes over time.


Dependency Boundaries
----
To maintain a clean architecture, I've established clear dependency boundaries between the layers
1.Domain Layer: This layer does not depend on any other layers. It contains pure business logic and entities.
2.Application Layer: This layer depends on the Domain Layer to access business logic and entities but does not depend on the UI Layer.
3.UI Layer: This layer depends on the Application Layer to interact with the business logic but does not depend on the Domain Layer directly.

Persistence Plan
----
Currently, the game state is stored in memory using JS objects, but in the future, I plan to implement local storage, then a backend service with a database to persist player progress across sessions.

Rationale for Development Choices
----
I wanted to be able to learn and at the same time be able to iterate quickly, especially in the beginning, so I chose not to start with a DB or backend at the beginning.
This allowed me to study and truly cement core concepts of software architecture in a methodical way, while also being able to see progress quickly.

Name based uniqueness is currently enforced in memory, but in the future, I plan to implement more robust validation and error handling, such as with generated IDs.

Next Steps
----
After completing the CRUD portion of the app, I will focus on integrating the UI and enabling user interactions.
Then I will add a proper persistence layer to save and load game state.
Once I have the Frontend linked up to the domain logic, I will start working on the Backend to enable the use of a database for persistence.
Finally, once I have a proper MVP, I will start adding more complex features like quests, training, and item management to enhance the gameplay experience.