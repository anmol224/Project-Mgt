const Project=require('../Model/Project')
const Client=require('../Model/Client')
const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType} =require('graphql')
const ClientType=new GraphQLObjectType({
    name:"Client",
    fields:() =>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
})
const ProjectType=new GraphQLObjectType({
    name:"Project",
    fields:() =>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                return Client.findById(parent.ClientId)
            }
        }
    })
})
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        clients:{
            type:new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find()
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Client.findById(args.id)
            }
        },
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find();
            }
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Project.findById(args.id)
            }
        }
    }
})
const mymutation=new GraphQLObjectType({
    name:'mutation',
    fields:{
        addClient:{
            type:ClientType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type: new GraphQLNonNull(GraphQLString)},
                phone:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
              return Client.create({
                name:args.name,
                email:args.email,
                phone:args.phone
              })
            }
        },
        deleteClient:{
            type:ClientType,
            args:{id:{type:new GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                Project.find({ClientId:args.id}).then(
                    (projects) =>{
                        projects.forEach((project) => project.remove() )
                    }
                )
                return Client.findByIdAndRemove(args.id)
            }
        },
        addProject:{
            type:ProjectType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                description:{type:new GraphQLNonNull(GraphQLString)},
                status:{
                    type:new GraphQLEnumType({
                        name:'projectStatus',
                        values:{
                            new:{value:"Not Started"},
                            progress:{value:"In Progress"},
                            completed:{value:"completed"}
                        }
                    }),
                    defaultValue:"Not started"
                },
                ClientId:{
                    type:new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent,args){
                return Project.create({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    ClientId:args.ClientId
                })
            }
        },
        deleteproject:{
            type:ProjectType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)}
            },
        resolve(parent,args){
            return Project.findByIdAndDelete(args.id)
        }
     },
     updateproject:{
        type:ProjectType,
        args:{
            id:{type:new GraphQLNonNull(GraphQLID)},
            name:{type:GraphQLString},
            description:{type:GraphQLString},
            status:{
                type:new GraphQLEnumType({
                    name:'ProjectStatusUpdate',
                    values:{
                        new:{value:"Not Started"},
                        progress:{value:"In Progress"},
                        completed:{value:"Completed"}
                    }
                })
            }
        },
        resolve(parent,args){
            return Project.findByIdAndUpdate(
                args.id,
                {
                $set:{
                    name:args.name,
                    description:args.description,
                    status:args.status  
                }
            },
               { new:true}
            )
        }
     }
    }
})
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:mymutation
})