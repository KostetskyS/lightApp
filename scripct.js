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
		name: 'Сережа',
		ip: '176.38.27.137',
		status: 'status',
		id: 0
	   },
	   {
		name: 'Ваня',
		ip: '176.36.194.218',
		status: 'status',
		id: 1
	   },
	   {
		name: 'Димочка',
		ip: '194.37.98.102',
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
		if (td3.textContent == 'Света нет') {
			td3.style.color= 'red';
		} 
		if (td3.textContent == 'Свет есть') {
			td3.style.color= 'green';
		} 
		
		tr.appendChild(td3);
		
		let td4 = document.createElement('td');
		let editBtn = document.createElement('button')

		editBtn.textContent = 'edit'
		
		editBtn.addEventListener('click', function editUser() {
			modalEditBtn.style.display = 'block';
			openModal();
			modalAddBtn.style.display = 'none';
			modalEditBtn.onclick = function editUser(){
				let space = /^[\s]+$/;
				if ((nameTake.value == '' || ipTake.value == '')) {
					alert('Заполни данные')
					return
				}
				if ((nameTake.value == space.test(String) || ipTake.value == space.test(String))) {
					alert('Нормально заполни')
					return
				}
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
			let space = /^[\s]+$/;
			let pattern = document.querySelector('pattern');
			if ((nameTake.value == '' || ipTake.value == '')) {
				alert('Заполни данные')
				return
			}
			if ((nameTake.value == space.test(String) || ipTake.value == space.test(String))) {
				alert('Нормально заполни')
				return
			}
			if (ipTake.value.match(pattern)) {
				alert('Нормально заполни')
				return
			}
			
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
});

async function oneUserCheckLight (user) {
	const request = await fetch('https://steakovercooked.com/api/ping/?' + new URLSearchParams({
			host: user.ip
		}));
		const response = await request.json();
		if (response !== null) {
			user.status = 'Свет есть';
		} 
		else {
			user.status = 'Света нет';
		} 
		
}

async function checkLight() {
	let promises = [];
	for (let user of users) {
		const promise = oneUserCheckLight(user);
		promises.push(promise);
	}
	await Promise.all(promises)
	createTable();
}
checkLight()

refreshBtn.addEventListener('click', checkLight);
