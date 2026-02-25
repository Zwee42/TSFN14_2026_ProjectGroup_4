		
**Introduction**

The objective of Task 3 was to understand how containerization, cloud infrastructure, and load balancing work together to improve availability and fault tolerance.

In this task, the application that was refactored in Task 2 was containerized and deployed to a Kubernetes cluster. The application was exposed through a Kubernetes load balancer and logs were used to verify correct operation.

The goal was not to build a complex cloud infrastructure but to gain practical experience with container deployment and load balancing.

⸻

**Containerization**

The application was containerized using Docker.

A Dockerfile was created to package the application together with its dependencies. The container uses a Node.js base image and installs all required packages before starting the backend server.

The container was tested locally to ensure that the application could run independently from the development environment.

Containerization makes the system easier to deploy because the same container can run locally and in the cloud.

⸻

**Container Registry**

A container registry was used to store the Docker image.

The container image was pushed to an Azure Container Registry so that it could be accessed by the Kubernetes cluster.

Using a container registry allows Kubernetes to download and run the correct version of the application.

This makes deployment reproducible and consistent.

⸻

**Kubernetes Deployment**

The applicaton was deployed to an Azure Kubernetes Service cluster.

A Kubernetes Deployment was created to define how the application should run. The deployment specifies:
	•	The container image
	•	The number of replicas
	•	The container port

Multiple replicas were used so that several applications instances could run simultaneously.

Running multiple replicas improves availability because the service can continue running even if one instance fails.

⸻

**Load Balancer Service**

A Kubernetes Service was created to expose the backend deployment.

The Service was configured as a LoadBalancer, which provides a public IP address for accessing the backend.

The load balancer distributes incoming requests between the backend Pods.

This allows the system to continue serving requests even if individual Pods restart.

⸻

**Verification**

The deployment was verified using Kubernetes tools.

The following commands were used:
	•	kubectl get nodes to verify the cluster
	•	kubectl get pods to verify running containers
	•	kubectl get svc to obtain the public IP
	•	kubectl logs to inspect backend logs

Requests were sent to the backend through the load balancer.

The logs showed that requests were handled correctly by the backend service.

Pods were restarted during testing to verify that the service remained available.

This demonstrated basic fault tolerance.

⸻

**Infrastructure as Code**

Terraform was used to define the cloud infrastructure.

Terraform configuration files were created to define:
	•	The Kubernetes cluster
	•	The container registry

Using Infrastructure as Code makes it possible to recreate the environment automatically.

The infrastructure can be created with:
terraform init
terraform apply

and removed with:
terraform destroy

**Lessons Learned**

During this task we learned:
	•	How to containerize a backend service and application
	•	How Docker images are stored in a registry
	•	How Kubernetes Deployments work
	•	How Services provide load balancing
	•	How logs can be used to verify behavior

We also learned how container-based deployment improves availability compared to running a single backend instance.


**Conclusion**

In Task 3, the application was successfully deployed to Kubernetes on Microsoft Azure using Docker and Terraform.

The application was containerized and stored in an Azure Container Registry and then deployed to an Azure Kubernetes Service cluster.

The application was exposed through a load balancer and multiple backend instances were used to improve availability.

The deployment demonstrated how containerization, Kubernetes, and cloud infrastructure on Azure can be used to support scalability and fault tolerance.

This task prepares the project for future work on monitoring, scaling, and load testing.



