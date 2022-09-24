### Logger 

- Enable / Disable logging from environment variables
- npmlog is used as logging library
- to change to another, checkout levels.ts , it provides an abstraction over 
    functions of npmlog, thus can be used to switch to another library,
    without making changes in application code.
- logging levels are used as provided by npmlog, these can further be modified from levels.ts 
- modify / define custom best practices for logging in warn-best-practices.ts
