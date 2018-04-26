'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('home')

// Route.get('/test', () => 'Hello All')

// Route.get('/ngetes',function() {
//     return 'mantap';
// })

// Route.get('/ngetes/:nama',function({params}) {
//     return 'mantap ' + params.nama;
// })

Route.get('/posts','PostController.index')

Route.get('/post/:id', 'PostController.details')

Route.get('/posts/add', 'PostController.add')

Route.post('/posts/', 'PostController.adding')

Route.get('/posts/edit/:id', 'PostController.edit')

Route.put('/posts/:id', 'PostController.update')

Route.delete('/posts/:id', 'PostController.delete')
