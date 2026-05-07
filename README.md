API Testing & Automation (CI Pipeline)
======================================
This repository demonstrates how to automate API testing using a Continuous Integration (CI) pipeline. The goal is to ensure that every change pushed to the codebase is automatically tested, validated, and verified—helping maintain code quality and reduce bugs before deployment.
Whether you're new to CI/CD or just exploring automation workflows, this project is designed to be simple, clear, and easy to follow.

Project Repository 
https://github.com/sysadmon/apiproject

What is a Pipeline?
===================
A pipeline is an automated workflow that tests and validates your code every time you make changes, ensuring it works correctly before moving forward. The CI pipeline is responsible for automatically running tests whenever changes are made to the repository.

How It Works
============
Code Push / Pull Request Trigger
Any push or pull request triggers the CI pipeline.

Environment Setup
==================
The pipeline sets up the required runtime and dependencies.

Test Execution
==============
API tests are executed using predefined scripts. After the test run, the pipeline checks if all tests pass successfully.

Result Reporting
================
If tests pass → ✅ Pipeline succeeds
If tests fail → ❌ Pipeline fails and logs errors

Link to the Projects Successful Pipeline Run: https://github.com/sysadmon/apiproject/actions/runs/25444953064

CI Status Badge https://github.com/sysadmon/apiproject/actions/workflows/ci.yml/badge.svg

Instructions to Run the Project Locally
=======================================
Follow these steps to run the project on your local machine:

Step 1. Download and install Install VS Code or your desired code editor 
Step 2. Download and Install Git 
Step 3. Clone the Repository using the command below:

git clone https://github.com/sysadmon/apiproject
cd apiproject

Step 4: Install Dependencies
From the terminal, run the command below
npm install

Step 5: Set Environment Variables

Create a .env file in the root directory and add the required variables (see section below).

Environment Variables Used
==========================
The following environment variables are required for the project to run properly:

Variable Name		Description
BASE_URL			Base URL of the API being tested
TEST_USER			Username for test authentication
TEST_USER_PASSWORD	Password for the test user
TEST_TIMEOUT		Timeout duration for API requests

Step 6: Run Tests
You run a test by running the command below
npm test

Summary
========
This project showcases how a CI pipeline can:

->>Automatically test your API
->>Catch bugs early
->>Improve development workflow
->>Ensure consistent quality across updates
->>If you're learning CI/CD, this is a practical starting point to understand how automation fits into modern software development.
