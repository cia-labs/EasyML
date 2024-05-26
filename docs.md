# Getting Started

# Frontend

## Prerequisites

Before you begin, make sure you have the following installed on your development machine:

- Node.js: [Download & Install Node.js](https://nodejs.org/)
  Make sure You have Node version > v21.6.1
- npm or Yarn: npm comes with Node.js installation, but you can also use Yarn as an alternative package manager.
- React Native CLI: Install React Native CLI globally by running `npm install -g react-native-cli`.

### Step 1: Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Ashish9738/Which-Images.git
```

### Step 2: Install Dependencies

First, Navigate to frontend.

```bash
cd frontend
```

```bash
# Install the dependencies
npm install

# or
yarn
```

### Step 3: Start the Metro Server

First, you will need to start **Metro**.
To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

# Backend

- Run the following commands to get started!
- Don't forget to check out config.py.

### Step 1: Install the requirements.txt

First, Navigate to Backend.

```bash
cd backend
```

```bash
#install the requirements
pip install -r requirements.txt
```

### Step 2: Start the server

```bash
uvicorn main:app --reload
```
