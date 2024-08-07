// Group Management (group.html)
const groupNameInput = document.querySelector('#groupName');
const createGroupForm = document.querySelector('#createGroupForm');
const groupsTableBody = document.querySelector('#groupsTable tbody');
const selectGroup = document.querySelector('#selectGroup');
const selectUsers = document.querySelector('#selectUsers');
const addUsersToGroupForm = document.querySelector('#addUsersToGroupForm');

// Group Management (group.html)
createGroupForm.addEventListener('submit', createGroup);
addUsersToGroupForm.addEventListener('submit', addUsersToGroup);
groupsTableBody.addEventListener('click', handleGroupActions);

// Save to local storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Load from local storage
function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

//Group Management (group.html)
function createGroup(event) {
    event.preventDefault();
    const group = {
        groupName: groupNameInput.value,
    };
    const groups = loadFromLocalStorage('groups');
    groups.push(group);
    saveToLocalStorage('groups', groups);
    renderGroups();
    createGroupForm.reset();
}

function renderGroups() {
    const groups = loadFromLocalStorage('groups');
    groupsTableBody.innerHTML = '';
    selectGroup.innerHTML = '';
    groups.forEach((group, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${group.groupName}</td>
            <td>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </td>
        `;
        groupsTableBody.appendChild(row);
        const option = document.createElement('option');
        option.value = index;
        option.textContent = group.groupName;
        selectGroup.appendChild(option);
    });
}

function addUsersToGroup(event) {
    event.preventDefault();
    const groupIndex = selectGroup.value;
    const selectedUsers = Array.from(selectUsers.selectedOptions).map(option => option.value);
    const groups = loadFromLocalStorage('groups');
    const group = groups[groupIndex];
    group.users.push(...selectedUsers);
    saveToLocalStorage('groups', groups);
}

function handleGroupActions(event) {
    const index = event.target.dataset.index;
    if (event.target.classList.contains('edit')) {
        editGroup(index);
    } else if (event.target.classList.contains('delete')) {
        deleteGroup(index);
    }
}

function editGroup(index) {
    const groups = loadFromLocalStorage('groups');
    const group = groups[index];
    groupNameInput.value = group.groupName;
    deleteGroup(index);
}

function deleteGroup(index) {
    const groups = loadFromLocalStorage('groups');
    groups.splice(index, 1);
    saveToLocalStorage('groups', groups);
    renderGroups();
}
// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
    renderGroups();
});
