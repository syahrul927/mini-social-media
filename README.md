# Initial Assessment
> Develop a "Mini Social Media Dashboard" web application.
This is a simple project using the T3 stack: TypeScript, Tailwind CSS, and tRPC.

## Table of Contents

- [Installation](#installation)
- [Setup Environment](#setup-environment)
- [Usage](#usage)

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/syahrul927/mini-social-media.git
cd mini-social-media
npm install
```
## Setup Environment
Before running the project, you'll need to set up the environment variables. A .env.example file is provided as a template.

1. Copy the .env.example file to .env:
```bash
cp .env.example .env
```
2. Open the .env file and fill in the required values. For example:
```bash
DATABASE_URL="file:./db.sqlite"
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```
Make sure to replace the placeholder values with your actual configuration.

## Usage
To start the development server, run:
```bash
npm run dev
```
This will start the application at http://localhost:3000.

To build the project for production, run :
```bash
npm run build
```
To start the production server, run:

```bash
npm run start
```

