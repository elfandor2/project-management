## Project Management API

Ini adalah API manajemen proyek sederhana yang dibangun dengan Node.js, Express, dan MongoDB, dikemas dengan Docker.

## Prasyarat

    Docker
    Docker Compose

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/elfandor2/project-management.git
   
2. **Build dan jalankan kontainer Docker**

    ```bash
    docker-compose up 
    
3. **Aplikasi akan berjalan di:**
    
    ```bash
    http://localhost:4000

Endpoints
Projects

    - Create Project
        POST /projects
        Request Body: { "name": "Project Name", "description": "Project Description" }
        Response: Created project object

    - Get All Projects
        GET /projects
        Response: Array of all projects

    - Get Project by ID
        GET /projects/:id
        Response: Project object

    - Update Project
        PUT /projects/:id
        Request Body: { "name": "Updated Name", "description": "Updated Description" }
        Response: Updated project object

    - Delete Project
        DELETE /projects/:id
        Response: Confirmation message

Tasks

    - Create Task for a Project
        POST /projects/:projectId/tasks
        Request Body: { "title": "Task Title", "description": "Task Description", "startTime": "ISO 8601 String", "endTime": "ISO 8601 String" }
        Response: Created task object

    - Get All Tasks for a Project
        GET /projects/:projectId/tasks
        Response: Array of tasks for the project

    - Update Task
        PUT /tasks/:id
        Request Body: { "title": "Updated Title", "description": "Updated Description", "startTime": "ISO 8601 String", "endTime": "ISO 8601 String" }
        Response: Updated task object

    - Delete Task
        DELETE /tasks/:id
        Response: Confirmation message

    - Completed the task
        PUT /tasks/:id/complete
        Response: Confirmation message

    - Uncompleted tasks from a Project
        GET /projects/:projectId/tasks/uncompleted
        Response: Array of tasks that uncompleted for the project 
        
## Kesimpulan

Proyek ini diatur agar mudah diperluas dan dirawat, dengan pemisahan yang jelas antara kepentingan dan struktur modular.
