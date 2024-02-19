# Todo Sphere README by Ha Anna [February 2024]

## Overview

Frontend: [Deployed on Render.](https://todo-sphere.onrender.com/)

Backend: [Deployed on Render.](https://todo-sphere-be.onrender.com/)

## Built with

### Frontend (client)

- Vue.js
- PUG
- Less
- Day.js
- js-confetti
- Axios
- vue3-spinner
- Font Awesome Icons

### Backend (server)

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemon
- dotenv
- Prettier
- ESLint

## Features

- Users can add a new task by clicking the “+ 작업 추가” button;
    - Clicking discloses hidden input field and submit button (red 작업 추가 button), and a cancel button to undisclose it back.
- Users can delete the task they have added;
    - The trash button on the right side of the list is initially hidden;
    - Hovering the cursor over the list item makes the trash button visible.
- Users can mark their tasks as ‘completed’ by clicking in the circle on the left side;
    - A toast message saying “1 작업을 완료했습니다” pops up;
    - A toast message automatically disappears after 2 seconds
    - Marking can be reversed by 실행 최소
- The page is responsive
- There is an incomplete/complete tasks counter
    - Based on completion there is a popup message to motivate/congratulate the user when they hover over the counter
- Spinner added for smoother transition while waiting for the db response
- Hidden surprise confetti in the menu
    - When the counter is clicked in the menu dropdown, confetti will appear
    - Confetti design will differ depending on the task completion status
- Added visually-hidden elements for the NavBar for better accessibility 

## Author

Coded by [Ha Anna](https://haanna.com/).
