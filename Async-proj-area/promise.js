const p=new Promise((resolve,reject)=>{
    //async work
    setTimeout(() => {
        // resolve(1)
        reject(new Error('message'))
    }, 2000);
    
    //reject(new Error('error'))

})

p.then(result=> console.log('Result', result))
.catch(err=>console.log('Error',err.message))
