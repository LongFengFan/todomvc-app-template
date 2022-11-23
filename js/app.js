(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	let selectTypeTodos = {
		all : function(todos) {
			return todos;
		},
		active : function(todos) {
			return todos.filter(o => !o.completed);
		},
		completed : function(todos) {
			return todos.filter(o => o.completed);
		},
	}
	const toDoKey = 'toDoKey';

	let todoStorage = {
		get() {
			return JSON.parse(localStorage.getItem(toDoKey)) || [];
		},
		set(todos) {
			var str = JSON.stringify(todos)
			localStorage.setItem(toDoKey, str)
			
		}
	}

	new Vue({
		el: "#mainApp",
		data:{
		// 	todos: [
		// 		{ id: 1, completed: true, title: "实力内容1" },
		// 		{ id: 2, completed: true, title: "实力内容2" },
		// 		{ id: 3, completed: false, title: "实力内容3" }
		// 	],
			todos: todoStorage.get(),
			inputStr: '',
			editingTodo: null,
			beforeEditTodoTitle: '',
			selectType : 'all',
		},
		watch : {
			todos : {
				deep: true,
				handler: todoStorage.set
			}
		},
		computed: {
			remainting() {
				
				return this.todos.filter(o => !o.completed).length;
			},
			toDoBySelectType() {
				return selectTypeTodos[this.selectType](this.todos);
			}
		},
		methods: {
			populateS(value) {
				return value + (this.remainting > 1 ? 's' : '');
			},
			toggleAll() {
				if (this.remainting) {
					for (var o of this.todos) {
						o.completed = true;
					}
				} else {
					for (var o of this.todos) {
						o.completed = false;
					}
				}
			},
			inputBlur() {
				if (this.inputStr != null && this.inputStr.length > 0) {
					var max = 0;
					for (var o of this.todos) {
						max = max > o.id ? max : o.id;
					}
					var newTodo = { id: ++max, completed: false, title: this.inputStr }
					this.inputStr = '';
					this.todos.push(newTodo)
					

				}
			},
			delteTodo(todo) {
				var index = this.todos.indexOf(todo);
				if (index != -1) {
					this.todos.splice(index, 1);
					
				}
			},
			editTodo(todo) {
				this.editingTodo = todo;
				this.beforeEditTodoTitle = todo.title;

			},
			cancelEdit(todo) {
				this.editingTodo = null;
				todo.title = this.beforeEditTodoTitle;
			},
			saveEdit(todo) {
				this.editingTodo = null;
				todo.title = todo.title.trim();
				if(!todo.title) {
					this.delteTodo(todo);
				}
				

			}
		},
		directives: {
			'edit-focus': function (el, binding) {
				if (binding.value) {
					el.focus()
				}
			}

		},
		
	});

})(window);
