# achieved-api

## tasks api

- get all tasks

```javascript
export const fetchAllTasks = () =>
	axios.get("https://achieved-api.herokuapp.com/api/tasks");
```

- post new task

```javascript
export const createTask = (taskData) => {
	// taskData should be like:
	// {
	//     name: string,
	//     color: Number(0 - 4)
	// }
	return axios.post("https://achieved-api.herokuapp.com/api/tasks", taskData);
};
```

- edit task

```javascript
export const updateTask = (taskData) => {
	// taskData can take in:
	//   {
	//     name: string,
	//     color: Number(0 - 4),
	//   }
	return axios.patch(
		`https://achieved-api.herokuapp.com/api/tasks/${taskData._id}`,
		taskData
	);
};
```

- add achieved times for task

```javascript
export const taskPlusOne = (taskId) =>
	axios.patch(`https://achieved-api.herokuapp.com/api/tasks/add/${taskId}`);
```

- delete task

```javascript
export const deleteTask = (taskId) =>
	axios.delete(`https://achieved-api.herokuapp.com/api/tasks/${taskId}`);
```

## dates api

- get all dates

```javascript
export const getAllDates = () =>
	axios.get("https://achieved-api.herokuapp.com/api/dates");
```
