### Functions & Operations : 
- Each file contains the operations for a redis data structure eg : All functions related to Hash are in : __hash_functions.ts__

- Create a new file as redis/[your-file-name].ts to define functions for other data structures, such as strings, sets...

- To call a function for a data-structure, import its operations via services eg : 
    ```
    import {hashFunctions} from "[relative path to services]";
    hashFunctions.createField(
    {
        key:"hash-name-here in which to create field",
        field:"field-name in above hash",
        value:"value of above field"
    }
    )
    ```
Read more about different data-structure & their operations here : [Redis Structures & Operations](https://redis.io/docs/data-types/)