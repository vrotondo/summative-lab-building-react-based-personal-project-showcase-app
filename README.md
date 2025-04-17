# summative-lab-building-react-based-personal-project-showcase-app
Foundations I - Summative Lab 2: Building a React-Based Personal Project Showcase App

Summative Lab: Building a React-Based Personal Project Showcase App
In this summative lab, you will design and develop a personal React-based project showcase application. Using the provided mock-up design document, you will build a Single Page Application (SPA) that adheres to modern frontend development practices. The application will demonstrate proficiency in Advanced React concepts such as state management through hooks, event handling, data fetching, and client-side routing. The lab reflects real-world challenges junior developers may face, preparing you to build scalable and interactive React applications.

The Scenario
You are tasked with creating an administrator portal for an e-commerce website which will include.

A landing page describing what the site is about.
A form page that allows for a new product to be added.
A product page that will show the product.
Allow the administrator to change different values of the product such as price.
A search functionality that allows users to dynamically search for a product.
A responsive design that matches the mock-up.
By completing this lab, you will:
Introduce advanced state management techniques.
Implement client side routing.
Manipulate data through a simulated backend to maintain persistence.
Test React components and interactions.
Tools and Resources
Development Tools: A text editor or IDE (e.g., VS Code), browser developer tools, Node.js, and GitHub.
Mock-up Design Document: Summative Assessment Design Document (C5M8) Links to an external site.

Note: You will be prompted to make a copy of the document; make sure to rename and save your copy to your desktop.
React Documentation: React DocsLinks to an external site...
React Router Documentation: React RouterLinks to an external site..
Testing Tools: Jest and React Testing Library.

Instructions

Task 1: Define the Problem
Analyze the mock-up design document to understand the project requirements and layout.
Identify the necessary components and their hierarchy based on the design.
Determine the routes needed to manage page layout.
Build out simulated backend within db.json file

Task 2: Determine the Design
Create a component tree that outlines the structure of your application, including parent and child components.
Define state and prop relationships within the component tree.
Build mock data that will resemble a product.
The data for this e-commerce site will be up to you! You can make this site sell what you would like, here is an example you can use to get yourself started.
{
 "store_info": [
    {
      "id": 1,
      "name": "Coffee R Us",
      "description": "The go to store for coffee",
      "phone_number": "555-5555"
    }
   ],
  "coffee": [
    {
      "id": 1,
      "description": "Medium Roast, nutty flavor",
      "name": "Vanilla bean",
      "origin": "Columbia",
      "price": 10.00
    },
    {
      "id": 2,
      "description": "Dark Roast, Rich flavor",
      "name": "House Blend",
      "origin": "Vietnam",
      "price": 12.00
    }
   ]
}
 Use the mock-up to finalize the visual layout and flow.
 
Task 3: Develop the Code
File Setup
Initialize or clone new React project:
Using create-react-app, vite, or a similar tool.
Using Github 
Create a directory structure for components, hooks, styles, and tests.
Routes
Build functional routes and components.
Build navigation between routes.
State Management
Use useState for local state management.
Use useId, useContext, and useRef as necessary.
Implement custom hook.
Data Fetching
Create and fetch data with a get request to display data.
Create post request to add new data.
Create patch request to allow administer to edit data.

Task 4: Test and Debug
Write unit tests for key components using Vitest and React Testing Library.
Test user interactions such as form submissions and routing.
Debug errors using browser developer tools and React DevTools.
Refactor for code clarity and maintainability.
Task 5: Document and Maintain
Add comments to explain complex logic and structure.
Write a README.md file that:
Provides setup and usage instructions.
Highlights features and any known limitations.
Push your project to GitHub, ensuring the repository is public for review.

Submission and Grading Criteria
Review the rubric below as a guide for how this lab will be graded.
Complete your assignment using your preferred IDE.
When you are ready, push your final script to GitHub.
Add the link to your GitHub repo below and submit your assignment. 
Summative Lab: Building a React-Based Personal Project Showcase App
Criteria
Points
Custom and Standard Hooks

Excelled
Advanced use and proper understanding of standard and custom hooks
20 pts

Met Expectations
Use of 1 standard hook and 1 custom hook.
16 pts

Attempted
Use of 1 standard hook or 1 custom hook.
8 pts

No Attempt
No use of hooks.
0 pts
/20 pts
CRUD

Excelled
Read, create, update (patch) and delete requests completed.
20 pts

Met Expectations
Read and create (post) request completed.
16 pts

Attempted
Read (get) request completed.
8 pts

No Attempt
No CRUD
0 pts
/20 pts
Client Side Routing

Excelled
3 or more routes created with clear navigation between all routes.
20 pts

Met Expectations
3 or more routes created some navigation.
16 pts

Attempted
Less then 3 routes created with no navigation
8 pts

No Attempt
No client side routing.
0 pts
/20 pts
Git Management

Excelled
Git utilized, branches used, pull requests merged, and branches cleared.
20 pts

Met Expectations
Git utilized, branches used for separate features
16 pts

Attempted
Git utilized, no branches used
8 pts

No Attempt
No git utilized.
0 pts
/20 pts
Testing

Excelled
Testing suite built for each feature created.
20 pts

Met Expectations
Thorough testing suit built.
16 pts

Attempted
Minimal testing suit built.
8 pts

No Attempt
No testing.
0 pts
/20 pts
