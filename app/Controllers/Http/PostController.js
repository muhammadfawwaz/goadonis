'use strict'

const Post = use('App/Models/Post')
const { validate } = use('Validator')
class PostController {
    async index({ view }) {
        // const posts = [
        //     {
        //         title: 'first post',
        //         desc: 'dat is post one'
        //     },
        //     {
        //         title: 'second post',
        //         desc: 'dat is post two'
        //     },
        //     {
        //         title: 'third post',
        //         desc: 'dat is post three'
        //     }
        // ]
        const posts = await Post.all()
        return view.render('posts.index',{
            title: 'Ma posts',
            posts: posts.toJSON()
        })
    }

    async details({view, params}) {
        const post = await Post.find(params.id);
        return view.render('posts.details',{
            title: 'Detail Post',
            post: post.toJSON()
        })
    }

    async add({ view }) {
        return view.render('posts.add')
    }

    async adding({ session, request, response }) {

        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            desc: 'required|min:3|max:255'
        })

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post = new Post()
        post.title = request.input('title')
        post.desc = request.input('desc')

        await post.save()

        session.flash({
            notification: 'Post Added'
        })

        return response.redirect('/posts')
    }

    async edit({ params, view }) {
        const post = await Post.find(params.id)
        return view.render('posts.edit',{
            post: post
        })
    }

    async update({params, response, request, session}) {
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            desc: 'required|min:3|max:255'
        })

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post = await Post.find(params.id)

        post.title = request.input('title')
        post.desc = request.input('desc')

        await post.save()

        session.flash({
            notification: 'Post Updated'
        })

        return response.redirect('/posts')
    }

    async delete({params, response, session}) {
        const post = await Post.find(params.id)

        await post.delete()

        session.flash({
            notification: 'Post deleted'
        })

        return response.redirect('/posts')
    }
}

module.exports = PostController
