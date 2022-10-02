### Lua Functions 

> Functions written in Lua language which are loaded in the redis instance
to : 

- Execute aggregation like features on the db itself
- Perform network heavy logic on db, to get result in less or single call
- Transfer application logic to redis

Functions can be loaded at startup, restart or at any point & can be executed with single call 

Read more in-depth about functions, functions v/s scripts, persistance here : 
[Redis Functions](https://redis.io/docs/manual/programmability/functions-intro/)

Try your lua code here : [lua Demo](https://www.lua.org/cgi-bin/demo)

> How To :

- Create a new function by creating a new file in lua/functions/[your-file-name].ts

- Load it by passing "function name" to "load" function : 
    ```
    import {luaFunctions} from "[relative path to services]"
    luaFunctions.load({
    functions: ["helloLua"],
    options: {
        replace: true,
    },
    });
    ``` 

- Execute function by passing "function name" to "call" function
    ```
    luaFunctions.call({
        functionName:"helloLua"
    })
    ```