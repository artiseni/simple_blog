params =  {

    post(rq, callback=null){
        let data = ""
        if (callback){
            rq.on('data', chunk => data += chunk)
            rq.on('end', () => {
                callback(JSON.parse(data))
            })
        }
    },

    get(rq, callback=null){
        let data = ""
        if (callback){
            rq.on('data', chunk => data =+ chunk)
            .on('end', () => {
                callback(JSON.parse(data))
            })
        }
    }

}

module.exports = params