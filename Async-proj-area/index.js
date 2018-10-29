console.log('before')
// getUser(1, function(user){
//     console.log("User", user)
//     getRepo(user.gitHubUsername, (repos)=>{
//         console.log('Repos',repos)
//     })
// })
console.log('after')
// const p=getUser(1)
// p.then(user=> getRepo(user.gitHubUsername))
// .then(repos=>getCommits(repos[0]))
// .then(commits=>console.log(commits))
// .catch(err=>console.log(err.message))

//Async and Await

async function displayCommits (){
    try{
        const user=await getUser(1)
        const repos= await getRepo(user.gitHubUsername)
        const commits= await getCommits(repos[0])
        console.log(commits)
    } catch(err){
        console.log('Error',err.message)
    }
    


}
displayCommits()




function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('reading a user from the database...')
            resolve({id:id,gitHubUsername:'ron'})
            
        },2000);


    })
 
}
function getRepo(username){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Calling Github Api.....')
            resolve (['repo 1','repo 2','repo 3'])
        }, 2000)

    })

    
}
function getCommits(repo){


    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Calling Api to get commits')
            resolve(['commits','commit 1'])
        },2000)
    })
}