## Zedu API Automation

Automated API test suite for Zedu Chat staging API `https://api.staging.zedu.chat/api/v1/` built with **JavaScript**, **Mocha**, and **Faker.js**.

### Features
- End-to-end coverage for Auth, Organisations, Channels, Contacts, and Blogs endpoints
- Dynamic test data generation using Faker.js with yopmail emails
- Centralized token management for authenticated requests
- Environment-based config with `.env`

## Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Run Tests
1. Clone the repository
git clone https://github.com/sysadmon/apiproject
cd apiproject
run npm test