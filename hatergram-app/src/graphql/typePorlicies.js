

export const typePolicies = {
    PostType: {
      fields: {
        hates: {
          merge:false
          
        },
        
      },
    },
    Query:{
      fields:{
        posts:{
          merge:false
        },
        userById:{
          merge:false
        },
        postsFollowed:{
          merge:false,
          
        },
        paginatePosts: {
          merge:false
        
        },
      },
    },
    
    UserType: {
      fields:{
        followers:{
          merge:false
        },
        posts:{
          merge:false
        }
      }
    },
  }