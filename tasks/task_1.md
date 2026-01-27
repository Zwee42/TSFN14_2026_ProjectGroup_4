Task 1

Describe the current application architecture

Main components 

Frontend 
      tsx, tailwind 
Backend 
    typescript 
database
    mongoDB
external service 
    mail service 
      node mailer 

How these components communicate
    Through REST API requests

The architectural style  → Multi-tired centralised system architecture ( three-tiered )


The key technologies, frameworks, and libraries involved.
    technologies: MongoDB, Mongoose
    Frameworks: react, nextJS, tailwind
    Libraries : Nodemailer
  


![](https://cdn.discordapp.com/attachments/1412754111358832640/1465720369339170826/IMG_5939.jpg?ex=697a21f7&is=6978d077&hm=16060c496d022eb77dae5c4db69850e458b39773a2bcea8dae7012c84aaa8b20&)





Identify scalability and fault-tolerance issues  &  3. Discuss the identified issues
 
S1. Resource usage 
Our resource usage does not increase quickly with the amount of users. We are using the free version of MongoDB so we have a set amount of storage we can use. Although, we do not have heavy services that require a lot of storage usage. Neither do we have a lot of computational usage.

By using more storage, it scales the application.

S2. Shared state 
We do not have separate databases. We only use mongoDB. In case it fails, we don't have any data

S3. Concurrency handling
The requests are processed concurrently. We used to have race conditions but we solved those using sockets.  In case we didn't fix it, we would have latency. 

S4. Blocking operations 
We don't have any blocking operations. In case we had blocking operations, we would have latency and worst case not being able to access the application.

S5. External dependencies 
We use email services ( Node Mailer). If it goes down, we can't do anything about it. 

Fault tolerance 

FT1. Single point failures 
We have a lot of single point failures, naming a few of them:

We only use one database & backend service. If our database fails, the user will be unable to login and register. To be able to use any services at all, you need to be logged in. 
Regarding backend failure, we do not have any runtime failure that breaks the entire system. Although if the backend fails to start, the whole application will crash. 

FT2. Error handling 
As far as we are aware, we are handling errors gracefully and providing useful error messages both to the user and on our side ( console ). For example, if the register failed to create the account, we provided a message either if it was a fault on our side, or if the username was already taken etc. In case it was sloppy done, it would take longer to find the error as well as make the users frustrated.

FT3. Dependency failures 
If our external service fails, our mail service, then being able to reset the password is the only thing that stops working. Data might be lost for that specific user, but the application will continue running.


FT4. Restart and recovery
In our experience, our application has never crashed. In case one component for example the backend fails, the only thing working would be our timer, since it is sorely built in the frontend. If the frontend failed, our application would not be able to work properly for the users. And if our database fail, we would not be able to access anything ( since the users are required to be logged in ).

FT5. Observability
As mentioned before, if something goes wrong an appropriate message is displayed for both the user and in the log. We wrote error messages to the console depending on the error as well as the HTTPS answers( such as 404 ) helped us identify the issues. If this wouldn't happen, it would take longer to search for errors, and it would be frustrating for users. 




 
