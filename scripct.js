'use strict';
const table = document.querySelector('#table');
const addButton = document.querySelector('#add');
const refreshButton = document.querySelector('#refresh');
const nameTake = document.querySelector('.nameTake');
const ipTake = document.querySelector('.ipTake');
const myIP = "176.38.27.137";
	
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
		console.log(user, "user");
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
		
		// table.appendChild(tr);


		let td4 = document.createElement('td');
		let button = document.createElement('button')

		button.textContent = 'edit'
		button.addEventListener('click', function() {
			// на модалке
			openModal();

			const editBut = document.querySelector('.editBut');
			const delButon = document.querySelector('.delBut');
			
			
			editBut.addEventListener('click', function(event){
				td1.textContent = nameTake.value;
				td2.textContent = ipTake.value;
				closeModal()
				// modal.style.display = "none";
			})
			delBut.addEventListener('click', function(event){
				// tr.remove();
				// modal.style.display = "none";
				const filteredUsersArr = users.filter(filteredUser => filteredUser.id !== user.id);
				users = filteredUsersArr;
				createTable();
				closeModal();
			})
			
		})

		td4.appendChild(button);
		
		tr.appendChild(td4);
		
		tbody.appendChild(tr);
		
	}
};

createTable();

function addUser() {
	// получаем айдишники всех юзеров
	const usersIds = users.map(user => user.id);

	// эту строку перепиши
	const uniqId = Math.max(...usersIds) + 1;
	
	console.log(uniqId, "uniqId");


	let user = new Object();
		for (let i = 0; i <= 4; i++) {
			user.id = uniqId;
			user.name = nameTake.value;
			user.ip = ipTake.value;
			user.status = 'Status';
	}
	users.push(user);
	createTable()
}

addButton.addEventListener('click', function() {
	modal.style.display = "block";
	
})

const modal = document.getElementById('myModal');

const span = document.getElementsByClassName("close")[0];


span.addEventListener('click', function() {
    // modal.style.display = "none";
	closeModal();
}) 

window.addEventListener('click', function(event) {
    if (event.target == modal) {
    // modal.style.display = "none";
	closeModal();
    }
})


const saveBut = document.querySelector('.saveBut');
const delBut = document.querySelector('.delBut');


saveBut.addEventListener('click', function() {
	 // editedUserId - это переменная которую нужно дабавить
 // в ней ты хранишь id юзера которого меняешь
//  users.forEach((user) =>
// {
//  console.log(user, "user");
//  console.log(editedUserId, "editedUserId");
addUser();
	ipTake.value = '';
	nameTake.value = '';
	// modal.style.display = "none";
	closeModal();
})
//  const userToUpdate = users.find((user) => user.id === editedUserId)
// 	userToUpdate.name = nameTake;
// 	userToUpdate.ip = ipTake;
 
 // перерисовать таблицу
 
// 	modal.style.display = "none";
	
// })

const colors = {
	available: {
	 textColor: "ffffff",
	 gradientStartColor: "48d420",
	 gradientEndColor: "41961b",
	},
	notAvailable: {
	 textColor: "f0f0f0",
	 gradientStartColor: "9c2424",
	 gradientEndColor: "661414",
	},
   };
   
   async function isAvailable() {
	let request = new Request(`https://vadimklimenko.com/ping/?ip=${myIP}`);
	request.headers = { Accept: "application/json" };
   
	let response = await request.loadJSON();
	console.log(response);
   
	// Scriptable will throw an error to widget in case of internet issues
	return [response.status == "ok", response.error];
   }
   
   
//    async function run() {
// 	const listWidget = new ListWidget();
   
// 	const [isWifiAvailable, errorText] = await isAvailable();
// 	const activeColors = colors[isWifiAvailable ? "available" : "notAvailable"];
// 	const { textColor } = activeColors;
   
// 	if (config.runsInApp) {
// 	 listWidget.presentMedium();
// 	}
   
// 	Script.setWidget(listWidget);
// 	Script.complete();
//    }
   
//    await run();
