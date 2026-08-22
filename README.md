# Dayflow HRMS

Dayflow is a web-based Human Resource Management System developed as a full-stack student project. It brings common HR tasks into one application, including employee records, attendance, leave requests, payroll, and reports.

The project has a React client and an Express server. Data is stored locally in a SQLite database, which makes the application easy to run for development and demonstration purposes.

## Main Features

### Authentication and roles

- JWT-based sign-in and registration
- Password hashing with bcryptjs
- Protected pages and API requests
- Separate access levels for employees, administrators, and HR users

### Employee records

- Employee profiles with personal and job information
- Employee directory for administrators
- Profile viewing and editing

### Attendance

- Check-in and check-out actions
- Attendance history
- Present, absent, half-day, and leave statuses

### Leave management

- Leave applications for employees
- Paid, sick, and unpaid leave types
- Pending, approved, and rejected states
- Administrator remarks and approval actions

### Payroll

- Monthly payroll records
- Base salary, allowances, deductions, and net salary
- Pending and paid payroll statuses

### Reports and dashboards

- Attendance, leave, and payroll reports
- Data summaries and charts
- Different dashboards for employees and administrators

## Technology Used

### Client

- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React
- date-fns
- Recharts

### Server

- Node.js
- Express.js
- TypeScript
- Better-SQLite3
- JSON Web Token
- bcryptjs
- express-validator
- CORS
- dotenv

### Development tools

- npm
- concurrently
- tsx
- PostCSS
- Autoprefixer

## Project Layout

```text
Dayflow-Human-Resource-Management-System/
|-- client/                  React and Vite frontend
|   |-- src/
|   |   |-- components/      Shared layout and route components
|   |   |-- contexts/        Authentication context
|   |   |-- pages/           Application screens
|   |   |-- App.tsx          Client routes
|   |   |-- main.tsx         Frontend entry point
|   |   `-- index.css        Global styles
|   |-- index.html
|   |-- package.json
|   |-- tailwind.config.js
|   |-- tsconfig.json
|   `-- vite.config.ts
|-- server/                  Express and SQLite backend
|   |-- src/
|   |   |-- database/         Database setup and migrations
|   |   |-- middleware/       Authentication middleware
|   |   |-- routes/           API route modules
|   |   `-- index.ts          Server entry point
|   |-- package.json
|   `-- tsconfig.json
|-- package.json             Root scripts
`-- README.md
```

## Requirements

Install the following before starting the project:

- Node.js 18 or newer
- npm 9 or newer, or Yarn

## Installation

1. Open a terminal in the project directory.

2. Install the root, server, and client dependencies:

   ```bash
   npm run install:all
   ```

   The equivalent manual installation is:

   ```bash
   npm install
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Create a file called `.env` inside the `server` folder:

   ```env
   PORT=5000
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

   For a real deployment, replace the example JWT secret with a long private value.

## Starting the Application

### Start both parts together

From the project root, run:

```bash
npm run dev
```

The normal development addresses are:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### Start the server only

```bash
npm run dev:server
```

### Start the client only

```bash
npm run dev:client
```

When starting the client and server separately, use two terminal windows.

## Production Build

Build the frontend:

```bash
cd client
npm run build
```

Build and start the backend:

```bash
cd server
npm run build
npm start
```

The client can also be previewed after building:

```bash
cd client
npm run preview
```

## Database

Dayflow uses Better-SQLite3. The database is created at:

```text
server/data/dayflow.db
```

The application creates the `data` directory automatically when the server starts. Database migrations also run during startup.

The database contains these main tables:

- `users` - Login accounts, roles, and account details
- `employee_profiles` - Employee personal and professional information
- `attendance` - Daily check-in and check-out records
- `leave_requests` - Employee leave applications
- `payroll` - Salary and payment records

## API Reference

The API is served from `http://localhost:5000`.

### Authentication

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new account |
| POST | `/api/auth/login` | Sign in and receive a JWT |
| GET | `/api/auth/me` | Get the current authenticated user |

### Employees

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/employees` | List employees for administrators |
| GET | `/api/employees/:id` | Get one employee |
| PUT | `/api/employees/:id` | Update an employee profile |
| DELETE | `/api/employees/:id` | Delete an employee as an administrator |

### Attendance

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/attendance` | Get attendance records |
| POST | `/api/attendance/check-in` | Record check-in |
| POST | `/api/attendance/check-out` | Record check-out |
| GET | `/api/attendance/:id` | Get one attendance record |

### Leave

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/leave` | List leave requests |
| POST | `/api/leave` | Create a leave request |
| PUT | `/api/leave/:id` | Update a leave request |
| DELETE | `/api/leave/:id` | Delete a leave request |
| PUT | `/api/leave/:id/approve` | Approve a request as an administrator |
| PUT | `/api/leave/:id/reject` | Reject a request as an administrator |

### Payroll

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/payroll` | Get payroll records |
| POST | `/api/payroll` | Create a payroll record as an administrator |
| GET | `/api/payroll/:id` | Get one payroll record |
| PUT | `/api/payroll/:id` | Update a payroll record as an administrator |

### Reports and status

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/reports/attendance` | Attendance report data |
| GET | `/api/reports/leave` | Leave report data |
| GET | `/api/reports/payroll` | Payroll report data |
| GET | `/api/health` | Check whether the API is running |

Most endpoints require a valid token in this format:

```text
Authorization: Bearer <your-jwt-token>
```

## User Roles

- **Employee** - Access to personal dashboard, profile, attendance, leave, and payroll
- **Admin** - Full access to employee management, approvals, payroll, and reports
- **HR** - Human resources access with administrator-style management permissions

## Frontend URLs

| URL | Screen | Access |
| --- | --- | --- |
| `/signin` | Sign-in page | Public |
| `/signup` | Registration page | Public |
| `/dashboard` | Employee dashboard | Protected |
| `/admin` | Administrator dashboard | Admin or HR |
| `/profile` | User profile | Protected |
| `/attendance` | Attendance management | Protected |
| `/leave` | Leave management | Protected |
| `/payroll` | Payroll view | Protected |
| `/employees` | Employee directory | Admin or HR |
| `/reports` | Reports and analytics | Admin or HR |

## Available npm Scripts

### Root folder

- `npm run dev` - Start client and server together
- `npm run dev:server` - Start the backend in development mode
- `npm run dev:client` - Start the frontend in development mode
- `npm run install:all` - Install dependencies in all project folders

### Client folder

- `npm run dev` - Start the Vite development server
- `npm run build` - Type-check and build the frontend
- `npm run preview` - Preview the production frontend build

### Server folder

- `npm run dev` - Start the backend with `tsx watch`
- `npm run build` - Compile the backend TypeScript
- `npm start` - Run the compiled backend

## Development Notes

- The client uses reusable React components, React Router, and an authentication context.
- The server is organized into Express route modules and middleware.
- TypeScript strict checking is enabled for both applications.
- SQLite migrations run automatically when the backend starts.
- Do not commit the server `.env` file or production secrets.

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make and test your changes.
4. Commit the changes:

   ```bash
   git commit -m "Describe your change"
   ```

5. Push the branch and open a pull request.

## License

This project is released under the ISC License.

## Author

Ch. Rahul Sai Sudheer
D. Pavana Krishna
B. Vamsi Krishna
B. Bhaskar

## Note

This application is intended for learning and development. Before using it in production, configure a secure JWT secret, review permissions, and add any security or deployment settings required for the target environment.
