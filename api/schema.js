import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean, isRequiredArgument, isNonNullType
    
}
from "graphql"
import { v4 as uuidv4 } from 'uuid';
import { toCursorHash , fromCursorHash } from "./helpers/cursorHash"
const bcrypt = require("bcryptjs")
import {signUpHandle} from "./helpers/signUp"
import {login} from "./helpers/logIn"
import {sequelize} from "./db"
import { Op } from "sequelize"
const UserType= new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve(user){
                return user.id
            } 
        },
        email:{
            type: GraphQLString,
            resolve(user){
                return user.email
            }
        },
        username: {
            type: GraphQLString,
            resolve(user){
                return user.username
            }
        },
        avatar:{
            type: GraphQLString,
            resolve(user){
                return user.avatar
            }
        },
        info:{
            type: GraphQLString,
            resolve(user){
                return user.info
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(user){
                return sequelize.models.post.findAll({ where:{ userId : user.id}})
            }
        },
        following: {
            type: new GraphQLList(FollowerType),
            resolve(user){
                return sequelize.models.follower.findAll({where: {follower: user.id}})
            }
        },
        followers: {
            type: new GraphQLList(FollowerType),
            resolve(user){
                return sequelize.models.follower.findAll({where: {followed: user.id}})
            }
        }
        
    })
}) 

const PostType = new GraphQLObjectType({
    name: "PostType",
    fields: () => ({
        id:{
            type: GraphQLInt,
            resolve(post){
               return post.id
            }
        },
        caption:{
            type:GraphQLString,
            resolve(post){
                return post.caption
            }
        },
        userId: {
            type: GraphQLInt,
            resolve(post){
                return post.userId
            }
        
        },
        image: {
            type: GraphQLString,
            resolve(post){
                return post.image
            }
        },
        user:{
            type: UserType,
            resolve(post){
                return sequelize.models.user.findOne({where: { id: post.userId}})
            }
        },
        hates:{
            type: new GraphQLList(HateType),
            resolve(post){
                return sequelize.models.hates.findAll({where: {postId: post.id}})
            }
        },
        comments:{
            type: new GraphQLList(CommentType),
            resolve(post){
                return sequelize.models.comment.findAll({where: {postId: post.id}, order: [['createdAt', "DESC"]]})
            }
        },
        
        
    
    })
})

const CommentType = new GraphQLObjectType({
    name:"CommentType",
    fields:()=>({
        id:{
            type: GraphQLInt,
            resolve(comment){
               return comment.id
            }

        },
        userId:{
            type: GraphQLInt,
            resolve(comment){
                return comment.userId
            }
        },
        postId:{
            type: GraphQLInt,
            resolve(comment){
                return comment.postId
            }
        },
        comment:{
            type: GraphQLString,
            resolve(comment){
                return comment.comment
            }
        },
        user:{
            type: UserType,
            resolve(comment){
                return sequelize.models.user.findOne({where: { id: comment.userId}})
            }
        },
        createdAt:{
            type: GraphQLString,
            resolve(comment){
                return comment.createdAt
            }
        },
        
        
    })
})

const HateType = new GraphQLObjectType({
    name: "HateType",
    fields: ()=>({
        id:{
            type: GraphQLInt,
            resolve(hate){
                return hate.id
            }
        },
        userId:{
            type: GraphQLInt,
            resolve(hate){
                return hate.userId
            }
        },
        postId:{
            type: GraphQLInt,
            resolve(hate){
                return hate.postId
            }
        },
    })
})


const FollowerType = new GraphQLObjectType({
    name: "FollowerType",
    fields: ()=>({
        id:{
            type: GraphQLInt,
            resolve(follow){
                return follow.id
            }
        },
        follower:{
            type: GraphQLInt,
            resolve(follow){
                return follow.follower
            }
        },
        followed:{
            type: GraphQLInt,
            resolve(follow){
                return follow.followed
            }
        },
        followerName:{
            type: UserType,
            resolve(follow){
                return sequelize.models.user.findOne({where: { id: follow.follower}})
            }
        },
        followedName:{
            type: UserType,
            resolve(follow){
                return sequelize.models.user.findOne({where: { id: follow.followed}})
            }
        },
        posts:{
            type: new GraphQLList(PostType),
            resolve(follow,args, req){
                return sequelize.models.post.findAll({order: [['createdAt', "DESC"]], where: {userId : [follow.followed, req.user.id]}})
            }
        }
    })
})

const PageInfoType = new GraphQLObjectType({
    name: 'PageInfoType',
    fields: ()=>({
        endCursor: {
            type: GraphQLString
        },
        hasNextPage: {
            type: GraphQLBoolean

        }
    })
})
    


const PersonEdgeType = new GraphQLObjectType({
    name: 'PersonEdgeType',
    fields: ()=>({
        cursor:{
            type: GraphQLInt,
            
        },
        node:{
            type: PostType
        }
    })
})



const PostConnectionType = new GraphQLObjectType({
    name: 'PostConnection',
    fields: ()=>({
        edges:{
            type: GraphQLList(PersonEdgeType)
        },
        pageInfo: {
            type: PageInfoType
        }
    })
})



const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:() =>({
        addUser: {
            type: UserType,
            args:{
                username: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
             resolve(root, {email, password, username}){
                return signUpHandle({email, password, username})
            }
        },
        login : {
            type: UserType,
            args:{
                email:{type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(root, {email, password}, req){
                return login({email, password, req})
            }
            
        },
        logout : {
            type: UserType,
            resolve(root, args, req){
                const {user}= req
                req.logout()
                return user
            }
        },
        createPost : {
            type: PostType,
            args: {
                caption : {type: GraphQLString},
                image: {type:GraphQLString}
            },
            resolve(root, {caption, image}, req){
                if(!req.user){throw new Error("Please log in")}
                return sequelize.models.post.create({ 
                    caption: caption,
                    image:image,
                    userId: req.user.id
                 })
            }
        },
        deletePost: {
            type: PostType,
            args:{
                id: {type: GraphQLInt}
            },
            resolve(root,{id}){
                return sequelize.models.post.findOne({where: {id}}).then(
                    resp=> {
                        resp.destroy()
                        return resp
                    }
                )
            }
        },
        userUpdate: {
            type: UserType,
            args: {
                avatar:{type: GraphQLString},
                info:{type: GraphQLString}
            },
            resolve(root, {avatar, info},req){
               return sequelize.models.user.findOne({where: {id: req.user.id}})
               .then(res => res.update({avatar: avatar, info: info }))
               
            }
        },
        hatesAdd: {
            type: HateType,
            args:{
                postId: {type:GraphQLInt}
            },
            resolve(root,{postId},req){
                return sequelize.models.hates.findOne({where: {postId: postId, userId: req.user.id}})
                .then(res=>{
                    if(res){
                        res.destroy()
                        return res
                    }
                    return sequelize.models.hates.create({postId: postId, userId: req.user.id})
                })
            }
        },
        hatesDelete:{
            type: new GraphQLList(HateType),
            args: {
                postId: {type:GraphQLInt}
            },
            resolve(root, {postId}){
                return sequelize.models.hates.findAll({where: {postId}}).then(
                    hates=> hates.map( hate => {
                        hate.destroy()
                        return hate
                    })
                )
            }
        },
        commentAdd:{
            type: CommentType,
            args:{
                postId: {type:GraphQLInt},
                comment: {type:GraphQLString}
            },
            resolve(root, {postId, comment}, req){
                return sequelize.models.comment.create({postId, comment, userId: req.user.id})
            }
        },
        commentsDelete:{
            type: new GraphQLList(CommentType),
            args:{
                postId: {type:GraphQLInt}
            },
            resolve(root, {postId}){
                return sequelize.models.comment.findAll({where: {postId}}).then(
                    comments=> comments.map( comment => {
                        comment.destroy()
                        return comment
                    })
                )
            }
        },
        followUnfollow: {
            type: FollowerType,
            args:{
                followed: {type: GraphQLInt}
            },
            resolve(root, {followed}, req){
                return sequelize.models.follower.findOne({where: {followed, follower: req.user.id}})
                .then( res => {
                    if(res){
                        res.destroy();
                        return res
                    }
                    return sequelize.models.follower.create({followed, follower: req.user.id})
                })
            }
        },
        followMyself: {
            type: FollowerType,
            args: {
                followed: {type: GraphQLInt},
                follower: {type: GraphQLInt}
            },
            resolve(root, {followed, follower}, req){
                return sequelize.models.follower.create({followed, follower})
                
            }    
        }
        

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve(){
                return sequelize.models.user.findAll()
            }
            
        },
        userById: {
            type: UserType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(root,{id}){
                return sequelize.models.user.findOne({where: {id}})
            }
        },
        user: {
            type: UserType,
            resolve(root, args, req){
                return req.user
            }
        },
        posts:{
            type: new GraphQLList(PostType),
            args: {
                first: {type:GraphQLInt},
                skip: {type: GraphQLInt}
            },
            resolve(root, {first, skip}){
                return sequelize.models.post.findAll({order: [['createdAt', "DESC"]], limit: first, offset: skip})
            }
        },
        postsFollowed:{
            type: new GraphQLList(PostType),
            resolve(root, args, req){
                    let newArr= [req.user.id]
                    return sequelize.models.follower.findAll({where: {follower: req.user.id}})
                    .then(res=>{
                        res.forEach(r=> newArr.push(r.followed))
                    }).then(res=>sequelize.models.post.findAll({where:{userId: newArr}, order: [['createdAt', "DESC"]]}))
                
            }

        },
        hates:{
            type: new GraphQLList(HateType),
            args: {
                postId: {type:GraphQLInt}
            },
            resolve(root,{postId}){
                return sequelize.models.hates.findAll({where: {postId}})
            }
        },
        commentsById: {
            type: new GraphQLList(CommentType),
            args: {
                postId: {type:GraphQLInt}
            },
            resolve(root,{postId}){
                
                return sequelize.models.comment.findAll({where: {postId} ,order: [['createdAt', "DESC"]]})
            }
        },
        paginatePosts: {
            type: PostConnectionType,
            args: {
                cursor: {
                    type: GraphQLString
                },
                limit: {type: GraphQLInt}
            },
            resolve(root , { cursor , limit = 3}){
                const WhereOptions = cursor
                    ? {
                        where: {
                        createdAt: {
                            [Op.lt]: fromCursorHash(cursor)  // decode the cursor
                        }
                        }
                    }
                    : {};
                return sequelize.models.post.findAll({
                    ...WhereOptions,
                    limit: limit + 1,
                    order: [["createdAt", "DESC"]]
                })
                .then(res =>{
                    if(res.length === 0){ 
                        return {pageInfo:{
                                    hasNextPage: false
                        }} 
                    }
                    const hasNextPage = res.length > limit ;
                    const nodes = hasNextPage ? res.slice(0, -1) : res

                    const edges = nodes.map(node =>{
                        return {node: node}
                    });
                    return {
                        edges: edges,
                        pageInfo:{
                            hasNextPage: hasNextPage,
                            endCursor: toCursorHash(nodes[nodes.length -1].createdAt.toString())
                        }
                    }
                    
                    
                })


            }
        }
        
        
    }) 
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})