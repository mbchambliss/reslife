var casual = require('casual-browserify');

$(document).ready(() => {

  let data;

  $('#createData').click(() => {
  	let userArray = [];

  	createFakeUsers(userArray);
  	displayFakeData(userArray);
  });


  $('#sendData').click(data => {
  		console.log(data);
  		console.log(`sendData button works!`);

  		fetch('https://ptsv2.com/t/roomp-toilet-13/post', {
		    method: 'POST',
		    headers:{
		    	'Content-Type': 'application/json',
		    	'Access-Control-Allow-Origin': 'no-cors'
		    },
		    body: JSON.stringify(data)
		  }).then(response => {
		    return response.json();
		  }).catch(error =>{
		  	console.log(`Error: ${error}.`);
		  });
	});

});

createFakeUsers = (array) => {
	let buildingArr = ['Davis', 'Malcolm X', 'Ignatius', 'Rivera'];
  	
  	for(let i = 0; i < 4; i++){
  		casual.define('user', function() {
			return {
				user_first: casual.first_name,
				user_last: casual.last_name,
				building_name: buildingArr[Math.floor(Math.random()*Math.floor(4))],
				floor_name: Math.floor(Math.random()*Math.floor(7)),
				room_name: Math.floor(Math.random()*Math.floor(40))
			};
		});
		var user = casual.user;
		user.user_email = `${user.user_first.slice(0,1)}${user.user_last}@randomu.edu`;
		user.user_uid = `${user.user_first.slice(0,1)}${user.user_last}`;
		user.user_start_date = '2021-01-16';
		user.user_end_date = '2021-05-10';
		user.user_phone = casual.phone.replace(/-/g, "");
		user.user_welcome_email_date = user.user_start_date;
		array.push(user);
  	}
  	let json = JSON.stringify(array);
  	data = json;
  	console.log(array);
  	// console.log(json);
}

displayFakeData = (array) => {
	let parent = document.getElementById('data');
  	
  	array.forEach(el => {
  		let listEl = document.createElement('li');
  		listEl.textContent = `${el.user_last}, ${el.user_uid} successfully added.`;
  		parent.appendChild(listEl);
  		// console.log(el.user_last, el.user_uid);
  	});
}
