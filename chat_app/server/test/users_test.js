const {Users}=require('../utils/users.js');
const expect=require('expect');

describe('users',function(){
	var users;
	beforeEach(function(){
		users=new Users;
		users.users=[
			{
				id:'1',
				name:'AAA',
				room:'Room 1'
			},
			{
				id:'2',
				name:'BBB',
				room:'Room 1'
			},
			{
				id:'3',
				name:'CCC',
				room:'Room 2'
			}
		];
	});

	it('add new user',function(){
		var local_users=users;
		var res=local_users.addUser('4','DDD','Room 2');
		expect(res).toEqual({
			id:'4',
			name:'DDD',
			room:'Room 2'
		});
	});

	describe('Remove user',function(){
		it('should remove id which exist',function(){
			var local_users=users;
			var res=local_users.removeUser('1');
			expect(res).toEqual({
				id:'1',
				name:'AAA',
				room:'Room 1'
			});
			expect(local_users.users).toEqual([
				{
					id:'2',
					name:'BBB',
					room:'Room 1'
				},
				{
					id:'3',
					name:'CCC',
					room:'Room 2'
				}	
			]);
		});

		it('should not remove id which not exist',function(){
			var local_users=users;
			local_users.removeUser('5');
			expect(local_users).toEqual(users);
		});
	});

	describe('Get User',function(){
		it('get users list',function(){
			var res=users.getUserList('Room 1');
			expect(res).toEqual(['AAA','BBB']);
		});

		it('get single user',function(){
			var res=users.getUser('1');
			expect(res).toEqual({
				id:'1',
				name:'AAA',
				room:'Room 1'
			});
		});
	});
});