const FIREBASE_DOMAIN = 'https://todo-d2942.firebaseio.com';

export async function getAllTasks() {
    const response = await fetch(`${FIREBASE_DOMAIN}/tasks.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch tasks.');
    }

    const transformedTasks = [];

    for (const key in data) {
        const taskObj = {
            id: key,
            ...data[key],
        };
        transformedTasks.push(taskObj);
    }

    return transformedTasks;
}

export async function getSingleTask(id) {
    const response = await fetch(`${FIREBASE_DOMAIN}/tasks/${id}.json`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch task.');
    }

    const loadedtask = {
        id: id,
        ...data,
    };

    return loadedtask;
}

export async function addTask(requestData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/tasks.json`, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not create task.');
    }

    return null;
}

export async function addComment(requestData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.id}.json`, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not add comment.');
    }

    return { commentId: data.name };
}

export async function getAllComments(id) {
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${id}.json`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not get comments.');
    }

    const transformedComments = [];

    for (const key in data) {
        const commentObj = {
            id: key,
            ...data[key],
        };

        transformedComments.push(commentObj);
    }
    return transformedComments;
}

export async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch data.');
    }
    return data;
}