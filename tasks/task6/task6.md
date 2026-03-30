Task 6 – Load Testing and Performance Observation
1. Test Setup
The goal of this load test was to observe how the backend service behaves under increasing load, focusing on response time.
The test scenario was simple: multiple users repeatedly sent requests to a single API endpoint. This represents a realistic use case since most interactions in the application rely on API calls.
The load test was created using JMeter. A small number of virtual users were simulated, and the load was gradually increased. Each test ran for around 1–3 minutes. The same test plan was used both locally and on Azure.
2. Key Observations
Local / General Behavior
As the number of users increased, the response time increased as well. The system handled low load relatively well, but performance became worse under higher load.
Azure – Successful Requests
For successful requests in Azure:
Average response time: 1613 ms


Minimum: 107 ms


Maximum: 14011 ms


This shows that even successful requests could take a long time, especially under load. The large gap between min and max response times indicates unstable performance.
Azure – Failed Requests
For failed requests:
Average response time: 34 ms


Minimum: 26 ms


Maximum: 127 ms


Failed requests were much faster because they were likely rejected early, before full processing. This is typical when the system is overloaded.
3. Analysis and Reflection
The results show that as load increases, the system becomes slower and less stable.
One clear pattern is that successful requests take significantly longer time, while failed requests return quickly. This suggests that the system is overloaded and cannot process all incoming requests properly.
The high response time for successful requests (up to 14 seconds) indicates that some parts of the system are becoming bottlenecks. This could be related to backend processing, database access, or limited resources in Azure.
There was no clear indication that the system scaled during the test. Possible reasons include:
Autoscaling was not triggered


The test duration was too short


Resource thresholds were not reached


Relating this to earlier tasks:
From Task 2 (architecture), the system may not be optimized for handling concurrent requests


From Task 5 (monitoring and scaling), the scaling configuration might not be properly set up or responsive enough


4. Lessons Learned
This test made it clear that:
Response time increases quickly under load


Systems can become unstable, not just slower


Failed requests often return faster because they are rejected early


Cloud environments introduce additional latency


Scaling must be properly configured to handle increased load


5. Conclusion
The backend service performs acceptably under low load, but as the number of users increases, response times become much higher and less consistent.
The difference between successful and failed requests shows that the system struggles under load and cannot handle all incoming traffic. To improve performance, better handling of concurrent requests and improved scaling configuration are needed.