# Description
This is a backend API (Node, Express and MongoDB) designed with MVC architecture and deployed on a free service platform Render.com. 
[Live API](https://koinx-y1sq.onrender.com/)

### Task1:
- Created account in the given api link.
- Using the API key, created a get request and address input based api.

### Task2:
- Created a service that kepps updating the ethereum cost in INR and USD in the database for every 10mins.
- Used Cron Jobs to complete this task.
- But this feature is not so clearly seen on render as it was a free platform.
- Should have deployed it on AWS but don't have account.

### Task3:
- Created a user input based api that takes address as input in the url and fetches data.
- Created two endpoints, one is /raw that fetches complete logs of transactions.
- Other is the normal /address that responses with total expenses for the transactions.
- On top of these, above two end points response with ethereum cost in INR and USD.