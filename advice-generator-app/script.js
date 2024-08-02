
getApi()


function getApi(){
    fetch('https://api.adviceslip.com/advice/' + Math.floor(Math.random() * 200))
    .then(res => res.json())
    .then(res =>  {
        document.getElementById("phrase").innerHTML= '"' + res.slip.advice + '"'
        document.getElementById("id").innerHTML= 'ADVICE #'+ res.slip.id
    })
    .catch(err => console.log(err))
}






