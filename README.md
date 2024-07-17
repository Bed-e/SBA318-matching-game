# Card Matching Game Project

# Overview

# This project is a web-based card matching game built using Node.js and Express. It allows users to play a card matching game, manage their accounts, and view high scores.

## Requirements Met

1. Custom Middleware
   Implemented custom middleware for user authentication (checkAuthentication.js) to protect certain routes and ensure users are logged in to access the game.
2. Error-Handling Middleware
   Added error-handling middleware that redirects users to an error.pug page when they attempt to access an unavailable page.
3. Data Categories
   Users: Handled user accounts and management.
   Games: Managed game state and scores.
   Comments: Allowed users to leave comments on the game.
4. Data Structuring Practices
   Utilized a structured approach to data organization in users.js, separating user data from the rest of the application logic.
5. GET Routes
   Created GET routes to expose data:
   / for the login page.
   /game/:username for the game page.
   /users for user management.
   High scores and error handling routes.
6. POST Routes
   Implemented POST routes for creating new users and adding comments:
   /users/register for user registration.
   /game/comments for submitting comments.
7. PATCH/PUT Routes
   Created PATCH routes for user account management:
   /users/:username/change-password for changing user passwords.
8. DELETE Routes
   Implemented DELETE routes for user account deletion:
   /users/:username/delete for deleting user accounts.
9. Route Parameters
   Used route parameters in several routes to access specific user data and game details.
10. REST Principles
    Adhered to RESTful design principles throughout the routing and data management processes.
11. View Rendering
    Utilized Pug as a templating engine to render views:
    Rendered dynamic pages including the login, game, profile, and high scores screens.
12. CSS Styling
    Added simple CSS for styling the rendered views, including card styles that mimic real playing cards.
13. Forms in Views
    Included forms for user interaction:
    Login and registration forms.
    Comment submission form in the game area.
14. Code Organization Practices
    Maintained reasonable code organization through separation of concerns, with distinct folders for routes, middleware, views, and public assets.
    Installation
    To run this project locally:

Clone the repository.
Navigate to the project directory.
Install the dependencies:
bash
Copy code
npm install
Start the server:
bash
Copy code
npm start
Usage
Access the application at http://localhost:3000.
Register a new account or log in to play the game and manage your profile.
