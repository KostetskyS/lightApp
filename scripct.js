'use strict';

const addBtn = document.querySelector('#addBtn');
const refreshBtn = document.querySelector('#refreshBtn');
const nameTake = document.querySelector('.nameTake');
const ipTake = document.querySelector('.ipTake');
const modalAddBtn = document.querySelector('.modalAdd');
const modalDelBtn = document.querySelector('.modalDelBtn');
const modalEditBtn = document.querySelector('.modalEditBtn');

let users = [
		{
		name: 'Димочка',
		ip: 'ip-address',
		status: 'status',
		id: 0
	   },
	   {
		name: 'Ваня',
		ip: 'ip-address',
		status: 'status',
		id: 1
	   },
	   {
		name: 'Кирилл',
		ip: 'ip-address',
		status: 'status',
		id: 2
	   },
];

const openModal = () => modal.style.display = "block" 
const closeModal = () => modal.style.display = "none"

function createTable(){
	const tbody = document.querySelector('tbody');
	tbody.innerHTML = '';
	
	for (let user of users) {
		let tr = document.createElement('tr');
		
		let td1 = document.createElement('td');
		td1.textContent = user.name;
		tr.appendChild(td1);
		
		let td2 = document.createElement('td');
		td2.textContent = user.ip;
		tr.appendChild(td2);
		
		let td3 = document.createElement('td');
		td3.textContent = user.status;
		
		tr.appendChild(td3);
		
		let td4 = document.createElement('td');
		let editBtn = document.createElement('button')

		editBtn.textContent = 'edit'
		
		editBtn.addEventListener('click', function editUser() {
			modalEditBtn.style.display = 'block';
			openModal();
			modalAddBtn.style.display = 'none';
			modalEditBtn.onclick = function editUser(){
				user.name = nameTake.value;
				user.ip = ipTake.value;
				createTable();
				closeModal()
				ipTake.value = '';
				nameTake.value = '';
			}
			modalDelBtn.onclick = function delUser(){
				const filteredUsersArr = users.filter(filteredUser => filteredUser.id !== user.id);
				users = filteredUsersArr;
				createTable();
				closeModal();
				
			}
			
		})

		td4.appendChild(editBtn);
		
		tr.appendChild(td4);
		
		tbody.appendChild(tr);
		
	}
};

createTable();

function addUser() {

	const usersIds = users.map(user => user.id);

	let uniqId = 0;
	usersIds.forEach(function (elem, index) {
	 if(uniqId < elem){
	  uniqId = elem;
	 }
	});

	let user = new Object();
		for (let i = 0; i <= 4; i++) {
			user.id = uniqId +1;
			user.name = nameTake.value;
			user.ip = ipTake.value;
			user.status = 'Status';
	}
	users.push(user);
	createTable()
}

addBtn.addEventListener('click', function() {
	modalEditBtn.style.display = 'none';
	modalAddBtn.style.display = 'block';
	openModal();
	
})

const modal = document.getElementById('myModal');
const span = document.getElementsByClassName("close")[0];

span.addEventListener('click', function() {
	closeModal();
}) 

window.addEventListener('click', function(event) {
    if (event.target == modal) {
	closeModal();
    }
})

modalAddBtn.addEventListener('click', function() {
	
addUser();
	ipTake.value = '';
	nameTake.value = '';
	closeModal();
})

 