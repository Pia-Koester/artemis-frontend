# Artemis Academy Booking Platform

Welcome to the Artemis Academy Booking Platform! This application serves as a class booking platform for self-defense classes offered by Artemis Academy in Hamburg. Users can book individual classes or purchase memberships to save money by paying for 10 classes at a time.

## Installation

To set up the project locally, follow these steps:

- Clone this repository to your local machine.
- Navigate to the project directory.
- Run npm install to install the necessary dependencies.
- Once installation is complete, start the development environment by running npm run dev.

## Usage

- All users can browse the class schedule and view details of the offered classes.
- To book classes, users need to create an account.
- Authentication is role-based:
  - Users with the "student" role can book classes, purchase memberships, and cancel bookings.
  - Users with the "admin" role have additional privileges:
    - Create new classes
    - Update existing classes
    - View payment information of all students

## API Integration

The backend for this booking platform is handled by the Artemis Academy Booking API, which can be accessed at https://artemisbooking.cyclic.app/api. For detailed API documentation, please refer to the API documentation.
