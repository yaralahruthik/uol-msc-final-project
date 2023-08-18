# University of Leeds MSc Advanced Computer Science Dissertation

This document outlines the requirements and instructions to run the project.

### Project Dependencies

- The project source code is entirely written in JavaScript.
- The exact dependenices can be directly found in the `package.json` file of the respective API.
- It works with Node versions greater than 10.0.0.

### Installation

1. Navigate to the respective API folder and run `npm install` to install the dependencies.
2. Run `node index.js` to start the API server.

### AWS EC2 Instance Troubleshooting

1. Follow the installations steps as stated above.
2. Make sure you have Node installed on the EC2 instance.
3. Make sure to open the inbound ports for the EC2 instance. [3000, 4000, 50051]
