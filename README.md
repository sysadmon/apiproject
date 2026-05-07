API Testing & Automation (CI Pipeline)<br />
======================================<br />
This repository demonstrates how to automate API testing using a Continuous Integration (CI) pipeline. The goal is to ensure that every change pushed to the codebase is automatically tested, validated, and verified—helping maintain code quality and reduce bugs before deployment.<br />
Whether you're new to CI/CD or just exploring automation workflows, this project is designed to be simple, clear, and easy to follow.<br />

Project Repository <br />
https://github.com/sysadmon/apiproject

What is a Pipeline?
===================
A pipeline is an automated workflow that tests and validates your code every time you make changes, ensuring it works correctly before moving forward. The CI pipeline is responsible for automatically running tests whenever changes are made to the repository.

How It Works
============
Code Push / Pull Request Trigger <br />
Any push or pull request triggers the CI pipeline.
<br />
Environment Setup
==================
The pipeline sets up the required runtime and dependencies.<br />

Test Execution
==============
API tests are executed using predefined scripts. After the test run, the pipeline checks if all tests pass successfully.

Result Reporting
================
If tests pass → ✅ Pipeline succeeds<br />
If tests fail → ❌ Pipeline fails and logs errors<br />
<br />
Link to the Projects Successful Pipeline Run: https://github.com/sysadmon/apiproject/actions/runs/25444953064
<br />
CI Status Badge https://github.com/sysadmon/apiproject/actions/workflows/ci.yml/badge.svg
<br />
Instructions to Run the Project Locally
=======================================
Follow these steps to run the project on your local machine:

Step 1. Download and install Install VS Code or your desired code editor <br />
Step 2. Download and Install Git <br />
Step 3. Clone the Repository using the command below:
<br />
git clone https://github.com/sysadmon/apiproject
cd apiproject
<br />
Step 4: Install Dependencies
From the terminal, run the command below
npm install
<br />
Step 5: Set Environment Variables
<br />
Create a .env file in the root directory and add the required variables (see section below).

Environment Variables Used
==========================
The following environment variables are required for the project to run properly:

Variable Name		    Sample data                              Description<br />
BASE_URL			      https://api.staging.zedu.chat/api/v1     Base URL of the API being tested<br />
TEST_USER			      user_name_of_the_tester                  Username for test authentication<br />
TEST_USER_PASSWORD	password_of_the_tester                   Password for the test user<br />
TEST_TIMEOUT		    test_time_out                            Timeout duration for API requests<br />
<br />
Step 6: Run Tests<br />
You run a test by running the command below<br />
npm test

Summary
========
This project showcases how a CI pipeline can:
<br />  
->>Automatically test your API<br />
->>Catch bugs early<br />
->>Improve development workflow<br />
->>Ensure consistent quality across updates<br />
->>If you're learning CI/CD, this is a practical starting point to understand how automation fits into modern software development.<br />
