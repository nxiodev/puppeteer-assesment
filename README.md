# Task Dashboard Synchronization Service

This project provides a simple REST API built with Express.js that leverages Puppeteer for synchronizing tasks between two dashboards. By calling a specific endpoint, users can synchronize up to 25 tasks at a time. The quantity of tasks to be synchronized can be specified through a query parameter.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the project, you need to have Node.js and npm (Node Package Manager) installed on your system. If you don't have them installed, follow the instructions on [Node.js official website](https://nodejs.org/) to install them.

### Installing

1. **Clone the Repository**

   Start by cloning the repository to your local machine:

    ```
    git clone https://github.com/nxiodev/puppeteer-assesment.git
    cd project
    ```

2. **Install Dependencies**

   Install the required npm packages:

    ```
    npm install
    ```

   This will install Express.js, Puppeteer, and any other dependencies listed in the `package.json` file.

3. **Environment Setup**

   Before starting the server, you may need to set up environment variables for todoist email and password. This is a must! C:
    ```
   TODOIST_EMAIL=email@email.com
   TODOIST_PASSWORD=yourpassword
   ```

### Running the Server

To start the Express server, run the following command in your terminal:

```
npm start
```


This command starts the server on the default port (3000). You can access the API at `http://127.0.0.1:3000`.

### Using the API

**Synchronize Tasks Endpoint**

- **URL**

  `/tasks`

- **Method:**

  `GET`

- **URL Params**

    - **Optional:**

      `qty_tasks=[integer]`

      Specifies the number of tasks to synchronize. If not provided, the default is 5 tasks. The maximum allowed is 25 tasks.

- **Success Response:**

    - **Code:** 200

      **Content:** `Tasks synchronized successfully!`

- **Error Response:**

    - **Code:** 400 BAD REQUEST

      **Content:** Error message specifying the reason for the failure.

### Example Request

To synchronize 7 tasks, you would make the following request:

```
http://127.0.0.1:3000/tasks?qty_tasks=7
```

## Built With

- [Express.js](https://expressjs.com/) - The web framework used
- [Puppeteer](https://pptr.dev/) - For automating web page interactions

