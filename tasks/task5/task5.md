**Task 5 – Monitoring and Basic Scaling Report**

**How Kubernetes knows whether your service is healthy**
Kubernetes monitors the backend service using three types of probes defined in the Deployment YAML:
	1.	Startup Probe – Checks whether the application has successfully started. If the probe fails repeatedly, Kubernetes will restart the pod until it starts correctly.
	2.	Readiness Probe – Determines if the pod is ready to serve traffic. Only pods that pass this check are included in the Service endpoints, ensuring that requests are not sent to unready pods.
	3.	Liveness Probe – Detects if the pod is alive and functioning. If the pod becomes unresponsive or unhealthy, Kubernetes restarts it automatically.

The probes are implemented as HTTP GET requests to /health on port 3000. By observing these probes in Kubernetes (using K9s, kubectl describe pod, or logs), it is possible to see the pod status change in response to failures or restarts.

⸻

**When and why scaling occurs**
Horizontal Pod Autoscaler (HPA) automatically adjusts the number of pod replicas based on observed resource metrics (CPU usage in this case).
	•	Scaling Up – Occurs when the CPU usage of existing pods exceeds the target threshold (50%). Kubernetes launches additional pods to handle increased load.
	•	Scaling Down – Occurs when CPU usage drops below the target threshold, reducing unnecessary resource consumption by terminating excess pods.

Scaling ensures that the backend can handle varying workloads efficiently while maintaining availability and responsiveness.
Logs and metrics can be observed in real-time through K9s or kubectl get hpa to verify the scaling behavior.


**please see the attached screenshots for Evidence that:**

**logs are produced and observable**

**probes are working**

**scaling occurs at least once**
