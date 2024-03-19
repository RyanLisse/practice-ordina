# Practice-Ordina Project

## Table of Contents

- [The Assignment](#the-assignment)
- [My Process](#my-process)
    - [Built With](#built-with)
    - [Folder Structure](#folder-structure)
    - [Run the App](#run-the-app)
    - [Vitest UI](#vitest-ui)
    - [Continued Development](#continued-development)

## The Assignment

This project was developed as a practical exercise for Ordina, focusing on creating backend functionalities for a bookshop's inventory management and sales analysis. The main objectives were:

- **CIN Validation:** Develop a function capable of validating a Catalogue Identification Number (CIN) based on predefined criteria, including a checksum verification.

- **Inventory Management:** Implement a system for updating the bookshop's inventory based on daily transactions, considering incoming and outgoing items.

- **Best Sellers Calculation:** Create a feature that extracts a list of best-selling items from the daily transaction log, allowing filtering by publication type and sorting by the number of copies sold.

## My Process

Here's an overview of the steps taken to complete the project:

**Step 1: Understanding the Requirements**
- Outlined the key functionalities and identified the main components needed for the project: CIN validation, inventory update, and best sellers calculation.
- Decided on an MVP approach, focusing on core functionalities first.

**Step 2: Setting Up the Project Structure**
- Created a basic project setup using Node.js and TypeScript, organizing the code into modules for clarity and maintainability.
- Configured Vitest for testing and adopted a Test-Driven Development (TDD) approach.

**Step 3: Implementing CIN Validation**
- Wrote initial tests for the `is_valid_cin` function, outlining the expected behavior and edge cases.
- Developed the `is_valid_cin` function, paying special attention to the checksum calculation and validation logic, ensuring all tests passed.

**Step 4: Building Inventory Management Logic**
- Created tests for the `calculate_inventory` function, covering various scenarios and edge cases.
- Designed the `calculate_inventory` function to accurately update the inventory based on the transaction log, making sure all tests passed.

**Step 5: Calculating Best Sellers**
- Wrote comprehensive tests for the `calculate_best_sellers` function, including filtering by publication type and sorting mechanisms.
- Implemented the `calculate_best_sellers` function, iteratively ensuring all tests passed.

**Step 6: Testing and Debugging**
- Continued adding tests to cover any remaining edge cases or scenarios, making adjustments based on the results.

**Step 7: Finalization and Documentation**
- Finalized the code, adding comments and documentation for future reference.
- 
## Built With

- Node.js
- TypeScript
- [Vitest](https://vitest.dev/) for testing
- ESLint and Prettier for code formatting and linting

## Folder Structure

The project follows a modular folder structure:

- `src/`: Contains application logic.
    - `helper/`: Utility functions (`is_valid_cin.ts`, `calculate_inventory.ts`, `calculate_best_sellers.ts`).
    - `model/`: Type definitions (`types.ts`).
    - `tests/`: Test files (`*.test.ts`).

This structure aids in maintainability and scalability.

## Run the App

To run the app locally:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Run tests using `npm run test`.

## Vitest UI

To interact with tests via a UI:
1. Execute `npm run test:ui`.
2. Open the URL provided in a web browser.
3. Use the UI to run tests and view results.

## Continued Development

Future considerations for the project include:

- Expanding the CIN validation to handle more complex rules.
- Introducing dynamic inventory alerts for low-stock items.
- Optimizing performance for handling large transaction logs.
- Possibly adding a frontend interface for a more interactive user experience.
