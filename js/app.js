(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	new Vue({
		el: "#mainApp",
		data: {
			todos: [
				{ id: 1, completed: true, title: "实力内容1" },
				{ id: 2, completed: true, title: "实力内容2" },
				{ id: 3, completed: false, title: "实力内容3" }
			],
			inputStr: ''
		},
		computed: {
			remainting() {
				return this.todos.filter(o => !o.completed).length;
			}
		},
		methods: {
			populateS(value) {
				return value + (this.remainting > 1 ? 's' : '');
			},
			toggleAll() {
				if(this.remainting) {
					for(var o of this.todos) {
						o.completed = true;
					}
				}else{
					for(var o of this.todos) {
						o.completed = false;
					}
				}
			},
			inputBlur() {
				if(this.inputStr != null && this.inputStr.length > 0) {
					var max = 0;
					for(var o of this.todos) {
						max = max > o.id ? max : o.id;
					}
					var newTodo = {id: ++max, completed: false, title: this.inputStr}
					this.inputStr='';
					this.todos.push(newTodo)
				}
			}
		}
	});

})(window);
