# Managely

Managely is a project management app, based off of Trello or something similar.

Users can create project boards, create categories, tasks, labels, and invite other to collaborate with them on their projects.

Tasks details can be edited:
- title
- description
- assignee
- category (via dropdown and drag-and-drop)
- position within a category (via drag-and-drop)
- labels

Images can also be added to tasks as attachments

Tasks in a project board can be filtered based on a user's search.


### Technologies include:

- React-router-dom
- Redux
- React-redux
- authentication and authorization
- Semantic UI
- Cloudinary
- React-beautiful-dnd (drag-and-drop)
---

__To run on your local machine:__  
Clone both the [frontend](https://github.com/elishevaelbaz/project-manager-client) and the [backend](https://github.com/elishevaelbaz/project-manager-api) repositories onto your machine using `git clone`.  

`cd` into the backend repository  
Run `bundle install` to download the necessary gems.  
Run `rails db:create && rails db:migrate` to create the database and the migrations.  
Run `rails db:seed` to seed the database.  
Run `rails s` to start the rails server (it will run on on PORT 3000)  

`cd` into the frontend repository:  
Run `npm install` to install the necessary package dependencies  
Follow the prompt to allow React to run on PORT 3001  

