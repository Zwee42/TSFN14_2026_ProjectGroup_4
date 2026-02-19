**1. Selected issue: Backend as a Single Point of Failure**

**What is the issue?**

The current application uses only one backend instance. If this backend crashes or becomes unavailable, the entire application becomes unusable.

All requests from users depend on this single backend instance.

Why is it a problem in our current system?

Currently, the backend assumes that only one instance is running. If we simply started multiple backend instances today, several issues could appear:
	•	Some logic may rely on in-memory state or local runtime state.
	•	Logging and debugging become harder since requests may hit different instances.
	•	Configuration is not fully prepared to run multiple instances simultaneously.

Even though persistent data is stored in MongoDB, parts of request handling and runtime behavior assume a single backend instance.

This means the system is not yet fully prepared to safely run multiple backend instances.

Under what conditions would this become noticeable?

This issue becomes noticeable when:
	•	many users access the system simultaneously,
	•	the backend crashes,
	•	the backend is restarted during deployment,
	•	the backend becomes overloaded,
	•	updates are deployed requiring server restart.

In these situations, the whole application becomes unavailable since no alternative backend instance exists.

⸻

**2. Proposed solution and trade-offs**

Revised architecture

Current architecture:

Frontend → Backend → MongoDB


Proposed architecture:

       ┌─────────────────────┐
       │      Frontend       │
       └─────────┬───────────┘
                 │
                 ▼
       ┌─────────────────────┐
       │   Load Balancer     │
       └───────┬─────────────┘
               │
   ┌───────────┼───────────┐
   ▼           ▼           ▼
Backend 1   Backend 2   Backend 3
   │           │           │
   └───────┬───┴───┬───────┘
           ▼       ▼
        MongoDB (shared)


Multiple backend instances run in Docker containers, and a load balancer distributes incoming requests among them.

⸻

**What changes compared to the current architecture?**

Instead of relying on a single backend instance, the backend runs in multiple containers. Requests are distributed between instances through a load balancer.

The application backend is prepared to run stateless so that any instance can process requests.

⸻

**How does this improve scalability and fault tolerance?**

Scalability improves because:
	•	multiple backend instances can handle requests simultaneously,
	•	additional instances can be started when load increases.

Fault tolerance improves because:
	•	if one backend instance crashes, others continue serving requests,
	•	the application remains available even during partial failures.

⸻

**Trade-offs and limitations**

This solution introduces new challenges:
	•	deployment becomes more complex due to container orchestration,
	•	debugging becomes harder with multiple backend instances,
	•	backend must remain stateless to function correctly,
	•	logging aggregation becomes necessary in larger deployments.

However, these trade-offs are acceptable since they prepare the system for future scaling.

⸻

**3. Refactoring plan**

Code areas to modify
	•	Backend server configuration.
	•	Request handling and middleware structure.
	•	Logging and error handling.

Code not modified at this stage
	•	Frontend application.
	•	Database structure.
	•	API functionality.

First refactoring steps
	•	Make backend port configurable through environment variables.
	•	Prepare backend to run multiple instances.
	•	Add request logging middleware.
	•	Improve error logging.

⸻

**4. Initial refactoring work**

An initial refactoring step was applied:
	•	Backend server port configuration was updated to support multiple instances.
	•	Middleware was added to log incoming requests.
	•	Error handling logs were improved.

This prepares the backend for containerized scaling without changing application functionality.

⸻

**5. Basic logging added**

Basic logging was introduced in the backend:
	•	Logs when a request is received.
	•	Logs errors and exceptional situations.
	•	Logs backend startup.

Console-based logging is currently used for simplicity.

⸻

**Conclusion**

The proposed solution removes the backend as a single point of failure and prepares the application for horizontal scaling using Docker containers. Only minimal refactoring has been implemented at this stage, focusing on preparing the system for future scaling and deployment tasks.

